const jwt=require("jsonwebtoken");
const secret= "kakbgga%$#@kjab";

function setUser(user){
    if(!user) return null;
    return jwt.sign({
        _id: user._id,
        email: user.email
    },secret);
}

function getUser(token){
    if(!token) return null;
    let res;
    try{
       res= jwt.verify(token,secret);
    } catch(err){
        res=null;
    }
    return res;
}

module.exports = {
    setUser,
    getUser
}