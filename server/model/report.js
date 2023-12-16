const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  sender:{type: mongoose.Schema.Types.ObjectId , ref:"user"},
  problem:{type:String},
  title:{type:String},
  description:{type:String},
  image:{type:String},
  department:{type:String},
  attended:{type:String},
  solved:{type:String},
  status:{type:String}
},{timestamps: true});

Report = mongoose.model('Report', reportSchema);

module.exports= Report;
