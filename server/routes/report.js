const {handleReport, getReports, getResponse, downloadReport, getUserReports} = require("../controller/reportFunc");
const express= require("express");
const { isSignIn, isAdmin} = require("../middleware/middleware");
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
  
router.post("/",isSignIn, handleReport);
router.get("/",isSignIn, isAdmin, getReports);
router.get("/response",isSignIn,isAdmin, getResponse);
router.get("/download",isSignIn, isAdmin, downloadReport);
router.post("/user",isSignIn, getUserReports);
//router.get("/closedReports", closedReports);

module.exports=router;