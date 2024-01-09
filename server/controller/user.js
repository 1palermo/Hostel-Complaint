const User = require("../model/user");
const Report = require("../model/report");
const Response = require("../model/response");
const {setUser,getUser} = require("../services/auth");
const cloudinary = require('../config/cloudStorage');


async function  handleLogin(req,res){
    const username = req.body.email
    const password = req.body.password
    const google = req.query.google;
    try{
        var user = await User.findOne({email:username})
        if(!user){
           return res.redirect("/login")
        } else{
        user.comparePasswords(password, (err,match) =>  {
            console.log("google", google);
            if(!match && google === "false"){
                return res.status(300).json({
                    url: "/",
                    valid: false
                })
            } else{
            const token = setUser(user);
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
                url: '/User/userHome',
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
                return res.status(400).redirect("/")
            }
            else{
                console.log("success",result);
                const user = new User({
                    username:req.body.username,
                    contact:req.body.contact,
                    email:req.body.email,
                    password:req.body.password,
                    category: "Hosteller",
                    userImage: result.secure_url,
                    tower: req.body.tower,
                    roll: req.body.roll,
                    hostel_room_no: req.body.hostel_room_no
                })
               // user.userImage = result.secure_url;
                user.save()
                    .then((user) => {
                    const token = setUser(user)
                    console.log("saved")
                    return res.status(200).json({
                        customToken: token,
                        url: "/User/userHome",
                        valid: true
                    })
                    })
                    .catch((error) => {
                    console.log(error)
                    return res.status(400).redirect("/")
                    })
            }
        })
       // return res.status(200).redirect("/")
}

async function handleAuthentication(req,res){
    const tokenUser= getUser(req.body.userToken);
   // console.log(tokenUser)
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            // console.log(user)
            if(!user){
                console.log("no user")
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
                url: '/User/userHome',
                valid: true,
            })
        } catch(e){
            console.log(e);
        }
    }
    return res.redirect({
        url: "/",
        valid: false
    });
}

async function handleProfile(req,res){
    const user = getUser(req.body.userToken);
    if(!user){ 
        res.json({
            username: "xyz",
            contact: 0,
            email: "xyz@admin.ac.in",
            hostel_room_no: "",
            tower: ""
        });
    }
    const profile=await User.find({_id: user?._id});
    res.json(profile);
}

async function handleUpdate(req,res){
    const id= getUser(req.body.userToken)?._id;
    const del= await User.findOneAndUpdate({_id: id},{
        username:req.body.data.username,
        contact:req.body.data.contact,
        tower: req.body.data.hostel_name,
        hostel_room_no: req.body.data.hostel_room
    });
    res.json({
        message: "updated successfully!"
    });
}

async function deleteUser(req, res){
    await User.deleteMany({_id: req.query.Id});
    const reports = await Report.find({sender: req.query.Id});
    reports.map(async(data)=>{
       await Response.deleteMany({problem: data._id});
    })
    await Report.deleteMany({sender: req.query.Id});
    res.status(200).json({ message: 'User and associated data deleted successfully.' });
}

async function getAllUsers(req, res){
    console.log("getUser");
    const Users=  await User.find({category: "Hosteller"});
    res.json(Users);
}

async function handleReport(req, res){
    const file = req.body.data.image;
    if(file){
    cloudinary.uploader
        .upload(file,{
            upload_preset: 'unsigned_upload',
            allowed_formats: ['jpg','jpeg','png']
        },function(err, result){
            if(err){
                console.log("failure",err);
                return res.status(400).redirect("/")
            }
            else{
                console.log("success",result);
                const report = new Report({
                    problem: req.body.data.issue,
                    title: req.body.data.title,
                    description: req.body.data.desc,
                    sender: getUser(req.body.userToken)._id,
                    department: req.body.data.department,
                    image: result.secure_url,
                    createdAt: new Date()
                })
               
                report.save()
                    .then((rep) => {
                    console.log(rep);
                    console.log("saved")
                    return res.status(200).json({
                        valid: true
                    })
                    })
                    .catch((error) => {
                        console.log(error)
                        return res.status(400).json({
                        valid: false
                        })
                    })
            }
        })
    }
    else{
        const report = new Report({
            problem: req.body.data.issue,
            title: req.body.data.title,
            description: req.body.data.desc,
            sender: getUser(req.body.userToken)._id,
            department: req.body.data.department,
            image: "",
            createdAt: new Date()
        })
       
        report.save()
            .then((rep) => {
            console.log(rep);
            console.log("saved")
            return res.status(200).json({
                valid: true
            })
            })
            .catch((error) => {
                console.log(error)
                return res.status(400).json({
                valid: false
                })
            })
    }
    
}

module.exports = {handleLogin ,handleSignup ,handleReport, handleAuthentication, handleProfile, handleUpdate, deleteUser, getAllUsers};