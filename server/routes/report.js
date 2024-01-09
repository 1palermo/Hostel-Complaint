const {handleReport, getReports, getResponse, downloadReport, getUserReports} = require("../controller/reportFunc");
const express= require("express");
const router= express.Router();

/*
const isAuth = (req, res, next) =>{
    console.log(req.session);
    if(req.session){
        console.log(req.session.cookie.token);
        next();
    } else{
        console.log('going');
        return res.redirect("/login")
    }
  }
*/
  
router.post("/", handleReport);
router.get("/", getReports);
router.get("/response", getResponse);
router.get("/download", downloadReport);
router.post("/user", getUserReports);
//router.get("/closedReports", closedReports);

module.exports=router;