const express= require("express");
const router= express.Router();
const {handleLogin , handleSignup, handleReport, handleAuthentication, handleProfile, handleUpdate, deleteUser, getAllUsers}= require("../controller/user");
const { isSignIn, isAdmin} = require("../middleware/middleware");

router.get("/",(req,res) => {
    res.json({valid: false, url:"/"});
})
  
router.route("/login")
.get((req,res) => {
    res.status(300).json({url: "/",
    valid: false});
})
.post(handleLogin);

router.get("/profile",isSignIn, handleProfile);

router.post("/update", isSignIn, handleUpdate);

router.get("/delete", isSignIn, isAdmin, deleteUser);

router.get("/getUser", isSignIn, isAdmin, getAllUsers);

router.route("/signup")
.get((req,res) => {
res.status(300).json({url: "/signup"});
})
.post(handleSignup);

router.get("/authenticate",handleAuthentication);

router.post("/submitReport",isSignIn, handleReport); 

module.exports=router;