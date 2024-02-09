const jwt=require("jsonwebtoken");
require('dotenv').config();

function setUser(user){
    if(!user) return null;
    return jwt.sign(
        user,
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );    
}

function getUser(token){
    if(token === '') return null;
    let res;
    try{

       res= jwt.verify(token, process.env.JWT_SECRET);
    } catch(err){
        console.log(err);
        res=null;
    }
    return res;
}

module.exports = {
    setUser,
    getUser
}