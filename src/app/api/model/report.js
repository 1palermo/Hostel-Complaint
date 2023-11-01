import mongoose from 'mongoose';

let Report;

if (mongoose.models.Report) {
  Report = mongoose.model('Report');
} else {
  const reportSchema = new mongoose.Schema({
    sender:{type: mongoose.Schema.Types.ObjectId , ref:"user"},
    problem:{type:String},
    title:{type:String},
    description:{type:String},
    image:{type:String},
    department:{type:String}
  },{timestamps: true});

  Report = mongoose.model('Report', reportSchema);
}

export default Report;
