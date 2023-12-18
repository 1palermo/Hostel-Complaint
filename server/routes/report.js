const {handleReport, getReports, getResponse, downloadReport} = require("../controller/reportFunc");
const express= require("express");
const router= express.Router();

router.post("/",handleReport);
router.get("/",getReports);
router.get("/response",getResponse);
router.get("/download",downloadReport);

module.exports=router;