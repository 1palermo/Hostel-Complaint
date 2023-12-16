const User = require("../model/user");
const {setUser,getUser} = require("../services/auth");
//import {v2 as cloudinary} from 'cloudinary';
//import Result from 'postcss/lib/result';
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'dttlt8f5i',
    api_key: '535748393319165',
    api_secret: 'VTbKpzBITyo0dkZUGah1Kiyx7b4',
    secure: true,
});


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
            const token = setUser(user)
            if(user.username === "Hostel-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"yes"}&dept=${"Hostel-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.username === "Electrical-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"Electrical-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.username === "Civil-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"Civil-Admin"}`,
                    customToken: token,
                    valid: true,
                })
            }
            else if(user.username === "ComputerCentre-Admin"){
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"ComputerCentre-Admin"}`,
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
    const user = new User({
        username:req.body.username,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        category:req.body.category
    })
    
    user.save()
        .then((user) => {
        const token = setUser(user)
        cloudinary.v2.uploader
        .upload(req.body.file,{
            resource_type: "image",
        })
        .then((result)=>{
            console.log("success",JSON.stringify(result, NULL,2));
        })
        .catch((err)=>{
            console.log("failure",JSON.stringify(err, NULL,2));
        })
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

async function handleAuthentication(req,res){
    const tokenUser= getUser(req.body.userToken);
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            if(!user){
                return res.redirect("/login")
            }
            return res.json({valid:true});
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