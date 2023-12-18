const Response = require("../model/response");
const cloudinary = require('../config/cloudStorage');
const Report = require("../model/report");
const mongoose = require('mongoose');

const handleReport = async (req,res)=>{
    const response = new Response();
    let flag = false;
    console.log('report');
    if(req.query.cat === 'Closed'){
        const response = new Response({
            category: "Closed",
            problem: req.query.Id
        });
        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{status:"Closed",solved:"Solved",attended:"Attended"});
        response.save()
            .then(() => {
            console.log('saved');
            return res.json({ans : "success"});
            })
            .catch((error) => {
            console.log(error);
            })
    }
    else{
        const file = req.body.image;
        //console.log(file);
        
        cloudinary.uploader
            .upload(file,{
                upload_preset: 'unsigned_upload',
                allowed_formats: ['jpg','jpeg','png']
            },async function(err, result){
                if(err){
                    console.log("failure",err);
                    return res.json({ans : "fail"});
                }
                else{
                    if(req.query.cat === "Attended"){
                        const response = new Response({
                           category: "Attended",
                           problem: req.query.Id,
                           description: req.body.text,
                           image: result.secure_url
                        });
                        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{attended:"Attended"});
                        response.save()
                            .then(() => {
                                console.log('saved');
                                return res.json({ans : "success"});
                            })
                            .catch((error) => {
                                console.log(error);
                                return res.json({ans : "fail"});
                            })
                    }
                    else{
                        const response = new Response({
                            category: "Solved",
                            problem: req.query.Id,
                            description: req.body.text,
                            image: result.secure_url
                         });
                        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{solved:"Solved"})
                        response.save()
                            .then(() => {
                                console.log('saved');
                                return res.json({ans : "success"});
                            })
                            .catch((error) => {
                                console.log(error);
                                return res.json({ans : "fail"});
                            })
                    }
                    console.log(response.image);
                }
            })
    }
}

const getReports = async(req,res)=>{
    let data;
    if(req.query.cat === "Hostel-Admin"){
        data = await Report.find({status: "Open"});
    }
    else if(req.query.cat === "Electrical-Admin"){
        data = await Report.find({status: "Open", department: "electrical department"});
    }
    else if(req.query.cat === "Civil-Admin"){
        data = await Report.find({status: "Open", department: "civil department"});
    }
    else if(req.query.cat === "ComputerCentre-Admin"){
        data = await Report.find({status: "Open", department: "computer centre"});
    }
    else{
        data = await Report.find({solved: "Unsolved"});
    }
    res.json(data);
}

const getResponse = async(req,res)=>{
    const data = await Response.find({problem: req.query.Id}).populate('sender');
    res.json(data);
}

module.exports = { handleReport, getReports, getResponse };