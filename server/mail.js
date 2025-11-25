const nodemailer = require("nodemailer");
require('dotenv').config();

const mail=async function sendEmail(email){
    let testAccount = await nodemailer.createTestAccount();
    let digits = '1234567890';
    let otp = ''
    for (i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Ayush Gupta 👻" <${process.env.SMTP_USER}>', // sender address
      to: email, // list of receivers
      subject: "OTP for verification", // Subject line
      text: "your one time password: "+otp, // plain text body
    }).then((data)=>{
      console.log("sent succesfully")
    }).catch((err)=>{
      console.log("error")
    })
    return otp;
  }

  module.exports = mail;
