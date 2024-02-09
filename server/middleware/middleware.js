const User = require("../model/user");
const {getUser} = require("../services/auth");


async function isSignIn(req,res,next){
    try{
    const token = req.headers.authorization;

    if(!token || token === ''){
      return res.status(400).json({error: 'token not found'});
    }
    else{
        const tokenUser= getUser(token);
   
        if(tokenUser){
            const email = tokenUser.email
            const _id = tokenUser._id;
            var user = await User.findOne({email,_id});
            // console.log(user)
            if(!user){
                return res.status(400).json({error: 'user not found'});
            }
            next();
        } 
        else return res.status(400).json({error: 'Invalid Token!'});
    }}
    catch(e){
        return res.status(404).redirect({
            error: 'Internal Server Error'
        });
    }
}

async function isAdmin(req,res,next){
    try{
    const token = req.headers.authorization;

    if(!token || token === ''){
      return res.status(400).json({error: 'token not found'});
    }

    else{
        const tokenUser= getUser(token);
 
        if(tokenUser){
            if(tokenUser.category === 'Hosteller'){
                return res.status(400).send("Unauthorized access");
            }
            next();
        } 
        else return res.status(400).json({error: 'Invalid Token!'});
    }}
    catch(e){
        console.log(e);
        return res.status(404).redirect({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {isSignIn, isAdmin};