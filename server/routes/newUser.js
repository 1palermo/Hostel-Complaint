const express= require("express");
const router= express.Router();
const {handleLogin , handleSignup , handleAuthentication, handleProfile, handleUpdate, deleteUser, getAllUsers}= require("../controller/user");


router.get("/",(req,res) => {
    res.json({valid: false, url:"/"});
})
  
router.route("/login")
.get((req,res) => {
    res.status(300).json({url: "/",
    valid: false,});
})
.post(handleLogin);

router.post("/profile",handleProfile);

router.post("/update",handleUpdate);

router.get("/delete", deleteUser);

router.get("/getUser", getAllUsers);

router.route("/signup")
.get((req,res) => {
res.status(300).json({url: "/signup"});
})
.post(handleSignup);

router.post("/authenticate",handleAuthentication);

module.exports=router;