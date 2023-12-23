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
  status:{type:String},
  tower:{type:String},
  hostel_room_no:{type:String},
  createdAt: {
    type: Date, // Change the type to Date
    default: Date.now,
    required: true,
  },
},{timestamps: true});

const monthsToseconds = (months) => months * 30 * 24 * 60 * 60 ;

Report = mongoose.model('Report', reportSchema);

reportSchema.index({ "createdAt": 1 }, { expireAfterSeconds: monthsToseconds(3) });

module.exports= Report;
