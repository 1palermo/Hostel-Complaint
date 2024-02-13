const Response = require("../model/response");
const cloudinary = require('../config/cloudStorage');
const Report = require("../model/report");
const mongoose = require('mongoose');
var fs = require("fs");
const excelJs = require("exceljs");
const { setUser, getUser } = require("../services/auth");

const handleReport = async (req, res) => {
    try {
        if (req.query.cat === 'Closed') {
            const response = new Response({
                category: "Closed",
                problem: req.query.Id,
                createdAt: new Date()
            });
            const rep = await Report.findOneAndUpdate({ _id: req.query.Id }, { status: "Closed", solved: "Solved", attended: "Attended" });
            await response.save();
         
            return res.json({ ans: "success" });
        } else {
            const file = req.body.data.image;
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(expirationDate.getDate() + 90);
            const expirationDateString = expirationDate.toISOString();
            cloudinary.uploader.upload(file, {
                upload_preset: 'unsigned_upload',
                allowed_formats: ['jpg', 'jpeg', 'png'],
                expires_at: expirationDateString
            }, async function (err, result) {
                if (err) {
                    console.log("failure", err);
                    return res.json({ ans: "fail" });
                } else {
                    if (req.query.cat === "Attended") {
                        const response = new Response({
                            category: "Attended",
                            problem: req.query.Id,
                            description: req.body.data.text,
                            sender: getUser(req.body.userToken)._id,
                            image: result.secure_url,
                            createdAt: new Date()
                        });
                        const rep = await Report.findOneAndUpdate({ _id: req.query.Id }, { attended: "Attended" });
                        await response.save();
                
                        return res.json({ ans: "success" });
                    } else {
                        const response = new Response({
                            category: "Solved",
                            problem: req.query.Id,
                            description: req.body.text,
                            image: result.secure_url,
                            sender: getUser(req.body.userToken)._id,
                            createdAt: new Date()
                        });
                        const rep = await Report.findOneAndUpdate({ _id: req.query.Id }, { solved: "Solved" });
                        await response.save();
               
                        return res.json({ ans: "success" });
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ans: "fail", message: "Internal Server Error" });
    }
};

const getReports = async (req, res) => {
    try {
        let data;
        if (req.query.cat === "Hostel-Admin") {
            data = await Report.find({ }).populate('sender');
        } else if (req.query.cat === "Electrical-Admin") {
            data = await Report.find({ department: "electrical department" }).populate('sender');
        } else if (req.query.cat === "Civil-Admin") {
            data = await Report.find({ department: "civil department" }).populate('sender');
        } else if (req.query.cat === "ComputerCentre-Admin") {
            data = await Report.find({ department: "computer centre" }).populate('sender');
        } else {
            data = await Report.find({ solved: "Unsolved", status: "Open" }).populate('sender');
        }
       // console.log(req.query.cat, data);
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ans: "fail", message: "Internal Server Error" });
    }
};

const getResponse = async (req, res) => {
    try {
        const data = await Response.find({ problem: req.query.Id }).populate('sender');
        res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ans: "fail", message: "Internal Server Error" });
    }
};

const downloadReport = async (req, res) => {
    try {
        let report;
        if (req.query.dept === "") {
            report = await Report.find({}).populate('sender');
        } else {
            report = await Report.find({ department: req.query.dept }).populate('sender');
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
            { header: "Attendant", key: "attendant", width: 25 },
            { header: "Attendant Mobile No.", key: "attendantMobile", width: 30 },
            { header: "Solver", key: "solver", width: 25 },
            { header: "Solver Mobile No.", key: "solverMobile", width: 25 },
        ];

        for (const value of report) {
            let attendant = "";
            let attendantContact = 0;
            let solverContact = 0;
            let solver = "";
            const response = await Response.find({ problem: value._id }).populate('sender');
           
            response.map((data) => {
                if (data.category === 'Attended') {
                    console.log(data.sender)
                    attendant = data.sender?.username;
                    attendantContact = data.sender?.contact;
                }
                if (data.category === "Solved") {
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
                status: value.status === "Closed" ? value.status : value.solved === "Solved" ? value.solved : value.attended,
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

const getUserReports = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = getUser(token);

        const report = await Report.find({ sender: user._id, status: "Open", solved: "Unsolved" });
        return res.json(report);
    } catch (error) {
        return res.status(500).json({ ans: "fail", message: "Internal Server Error" });
    }
}

module.exports = { handleReport, getReports, getResponse, downloadReport, getUserReports };
