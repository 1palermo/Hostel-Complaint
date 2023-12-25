const Response = require("../model/response");
const cloudinary = require('../config/cloudStorage');
const Report = require("../model/report");
const mongoose = require('mongoose');
var fs = require("fs");
const excelJs = require("exceljs");
const {setUser,getUser} = require("../services/auth");


const handleReport = async (req,res)=>{
    const response = new Response();
    let flag = false;
    console.log('report');
    if(req.query.cat === 'Closed'){
        const response = new Response({
            category: "Closed",
            problem: req.query.Id,
            createdAt: new Date()
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
        const file = req.body.data.image;
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
                  //  io.broadcast.emit("getReports", "Server event");
                    if(req.query.cat === "Attended"){
                        const response = new Response({
                           category: "Attended",
                           problem: req.query.Id,
                           description: req.body.data.text,
                           sender: getUser(req.body.userToken)._id,
                           image: result.secure_url,
                           createdAt: new Date()
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
                            image: result.secure_url,
                            sender: getUser(req.body.userToken)._id,
                            createdAt: new Date()
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
        data = await Report.find({status: req.query.status}).populate('sender');
    }
    else if(req.query.cat === "Electrical-Admin"){
        data = await Report.find({status: req.query.status, department: "electrical department"}).populate('sender');
    }
    else if(req.query.cat === "Civil-Admin"){
        data = await Report.find({status: req.query.status, department: "civil department"}).populate('sender');
    }
    else if(req.query.cat === "ComputerCentre-Admin"){
        data = await Report.find({status: req.query.status, department: "computer centre"}).populate('sender');
    }
    else{
        data = await Report.find({solved: "Unsolved"}).populate('sender');
    }
    res.json(data);
}

const getResponse = async(req,res)=>{
    const data = await Response.find({problem: req.query.Id}).populate('sender');
    res.json(data);
}

const downloadReport = async (req, res) => {
    try {
      console.log(req.query.dept)
      let report;
      if(req.query.dept === ""){
        report = await Report.find({}).populate('sender');
      }
      else{
        report = await Report.find({department: req.query.dept}).populate('sender');
      }
  
      let workbook = new excelJs.Workbook();
      const sheets = workbook.addWorksheet("reports");
  
      sheets.columns = [
        { header: "Sender", key: "username", width: 25 },
        { header: "Mobile No.", key: "contact", width: 25 },
        { header: "Tower", key: "tower", width: 25 },
        { header: "Hostel Room No.", key: "hostel_room_no", width: 25 },
        { header: "Title", key: "title", width: 50 },
        { header: "Problem", key: "problem", width: 50 },
        { header: "Description", key: "description", width: 150 },
        { header: "Department", key: "department", width: 25 },
        { header: "Status", key: "status", width: 25 },
        { header: "Attendant", key: "attedant", width: 25 },
        { header: "Attendant Mobile No.", key: "attedantMobile", width: 30 },
        { header: "Solver", key: "solver", width: 25 },
        { header: "Solver Mobile No.", key: "solverMobile", width: 25 },
      ];
  
      for (const value of report) {
        let attendant = "";
        let attendantContact = 0;
        let solverContact = 0;
        let solver = "";
        const response = await Response.find({problem: value._id}).populate('sender');
        response.map((data)=>{
           if(data.category === "Attended"){
              attendant = data.sender?.username;
              attendantContact = data.sender?.contact;
           }
           if(data.category === "Solved"){
            solver = data.sender?.username;
            solverContact = data.sender?.contact;
          }
        })
    
        sheets.addRow({
          username: value.sender?.username,
          contact: value.sender?.contact,
          tower: value.sender?.tower,
          hostel_room_no: value.sender?.hostel_room_no,
          title: value.title,
          problem: value.problem,
          description: value.description,
          department: value.department,
          status: value.status === "Closed" ? value.status : value.solved === "Solved"? value.solved : value.attended ,
          attendant: attendant, 
          attendantMobile: attendantContact,
          solver: solver,
          solverMobile: solverContact
        });
      }
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
  
      res.setHeader(
        "Content-Disposition",
        "attachment;filename=reports.xlsx"
      );
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };


module.exports = { handleReport, getReports, getResponse, downloadReport};