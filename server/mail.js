const nodemailer = require("nodemailer");

const mail=async function sendEmail(email){
    let testAccount = await nodemailer.createTestAccount();
    let digits = '1234567890';
    let otp = ''
    for (i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: 'adgj77297@gmail.com',
        pass: '9D1D942063AE0BE1D655C20EFDAA7D885342'
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      SecureToken : "baf7a9a3-6e5f-4ce6-8a95-44ce56f8a86b",
      from: '"Ayush Gupta 👻" <adgj77297@gmail.com>', // sender address
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