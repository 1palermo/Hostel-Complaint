const User = require("../model/user");
const {setUser,getUser} = require("../services/auth");
//import {v2 as cloudinary} from 'cloudinary';
//import Result from 'postcss/lib/result';
const cloudinary = require('../config/cloudStorage');


async function  handleLogin(req,res){
    const username = req.body.email
    const password = req.body.password

    try{
        var user = await User.findOne({email:username})
        if(!user){
        return res.redirect("/login")
        } else{
        user.comparePasswords(password, (err,match) =>  {
            if(!match){
            return res.redirect("/login")
            } else{
            const token = setUser(user);
           // req.session.token = token;
           // req.session.isAuth = true;
           // res.cookie('cookie', {token: token} , { expires: new Date(Date.now() + 86400000) });
            if(user.category === "Hostel-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"yes"}&dept=${""}&cat=${"Hostel-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.category === "Electrical-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"electrical department"}&cat=${"Electrical-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.category === "Civil-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"civil department"}&cat=${"Civil-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.category === "ComputerCentre-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"computer centre"}&cat${"ComputerCentre-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.category === "Attendant"){
                return res.status(300).json({
                    url: '/Attendant',
                    customToken: token,
                    valid: true,
                })
            }
            return res.status(300).json({
                url: '/user',
                customToken: token,
                valid: true,
            })
            }
        })
        }
    }catch(e){
        console.log(e);
    }
}

async function handleSignup(req,res){
    const file = req.body.image;
    //console.log(file);
    
    cloudinary.uploader
        .upload(file,{
            upload_preset: 'unsigned_upload',
            allowed_formats: ['jpg','jpeg','png']
        },function(err, result){
            if(err){
                console.log("failure",err);
                return res.status(200).redirect("/")
            }
            else{
                console.log("success",result);
                const user = new User({
                    username:req.body.username,
                    contact:req.body.contact,
                    email:req.body.email,
                    password:req.body.password,
                    category:req.body.category,
                    userImage: result.secure_url
                })
               // user.userImage = result.secure_url;
                console.log(user.userImage);
                user.save()
                    .then((user) => {
                    const token = setUser(user)
                 //   req.session.token = token;
                  //  req.session.isAuth = true;
                    if(req.body.category === "Attendant"){
                        return res.json({
                            customToken: token,
                            url: "/Attendant"
                        })
                    }
                    else{
                        return res.json({
                            customToken: token,
                            url: "/user"
                        })
                    }
                    })
                    .catch((error) => {
                    return res.status(200).redirect("/")
                    })
            }
        })
       // return res.status(200).redirect("/")
}

async function handleAuthentication(req,res){
    const tokenUser= getUser(req.body.userToken);
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            if(!user){
                return res.json({valid:false, url:'/'});
            }
            if(user.category === "Hostel-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"yes"}&dept=${""}&cat=${"Hostel-Admin"}`,
                    valid: true,
                })
            }
            else if(user.category === "Electrical-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"electrical department"}&cat=${"Electrical-Admin"}`,
                    valid: true,
                })
            }
            else if(user.category === "Civil-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"civil department"}&cat=${"Civil-Admin"}`,
                    valid: true,
                })
            }
            else if(user.category === "ComputerCentre-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"computer centre"}&cat${"ComputerCentre-Admin"}`,
                    valid: true,
                })
            }
            else if(user.category === "Attendant"){
                return res.status(300).json({
                    url: '/Attendant',
                    valid: true,
                })
            }
            return res.status(300).json({
                url: '/user',
                valid: true,
            })
        } catch(e){
            console.log(e);
        }}
        return res.redirect("/login");
}

async function handleProfile(req,res){
    const user = getUser(req.body.userToken);
    if(!user){ 
        res.json({
            username: "xyz",
            contact: 0,
            email: "xyz@admin.ac.in",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magni, nemo tempora iste at corrupti quasi magnam culpa qui! Accusantium eligendi doloremque, deleniti perferendis iste quo consectetur! Amet, est culpa?"
        });
    }
    const profile=await User.find({_id: user._id});
   // console.log(profile);
    res.json(profile);
}

async function handleUpdate(req,res){
    const id= getUser(req.body.userToken)._id;
    const del= await User.findOneAndUpdate({_id: id},{description:req.body.user});
    res.json(id);
}

module.exports = {handleLogin ,handleSignup ,handleAuthentication, handleProfile, handleUpdate};