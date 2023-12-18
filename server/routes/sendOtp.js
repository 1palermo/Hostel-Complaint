const express= require("express");
const router= express.Router();
const sendEmail = require("../mail");

router.get("/",async(req,res)=> {
    const otp= await sendEmail(req.query.id);
    res.status(200).send(otp)
})

module.exports= router;