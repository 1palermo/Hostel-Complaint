const {handleReport, getReports, getResponse} = require("../controller/reportFunc");
const express= require("express");
const router= express.Router();

router.post("/",handleReport);
router.get("/",getReports);
router.get("/response",getResponse);

module.exports=router;