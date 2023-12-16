const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  sender:{type: mongoose.Schema.Types.ObjectId , ref:"user"},
  category:{type:String},
  description:{type:String},
  image:{type:String},
  problem:{type: mongoose.Schema.Types.ObjectId , ref:"report"}
},{timestamps: true});

Response = mongoose.model('Response', responseSchema);

module.exports = Response;
