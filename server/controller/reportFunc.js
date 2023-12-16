const Response = require("../model/response");
const Report = require("../model/report");
const mongoose = require('mongoose');

const handleReport = async (req,res)=>{
    const response = new Response();
    if(req.query.cat === "Attended"){
        response.category = "Attended";
        response.problem = req.query.Id;
        response.description = req.body.desc;
        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{attended:"Attended"});
    }
    else if(req.query.cat === "Solved"){
        response.category = "Solved";
        response.description = req.body.desc;
        response.problem = req.query.Id;
        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{solved:"Solved"})
    }
    else{
        response.category = "Closed";
        response.problem = req.query.Id;
        const rep = await Report.findOneAndUpdate({_id:req.query.Id},{status:"Closed",solved:"Solved",attended:"Attended"})
    }

    let flag = false;
    await response.save()
        .then((user) => {
         flag = true;
        })
        .catch((error) => {
           console.log(error);
        })
    if(flag === true){
        console.log("success")
        return res.json({ans : "success"});
    }
    else{
        console.log("fail")
        return res.json({ans : "fail"});
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