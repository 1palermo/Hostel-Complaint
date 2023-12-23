const mongoose = require("mongoose")
const connect = require("../config/connect")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userImage:{
        type:String,
    },
    category:{
        type:String,
    },
    tower:{
        type:String,
    },
    hostel_room_no:{
        type:String,
    },
    description:{
        type:String,
    }
})

UserSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

UserSchema.methods.comparePasswords = function(plainText,callback){
    return callback(null,bcrypt.compareSync(plainText,this.password))
}

const User = mongoose.model('user', UserSchema);

module.exports = User;