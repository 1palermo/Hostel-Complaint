const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "report" },
  createdAt: {
    type: Date, // Change the type to Date
    default: Date.now,
    required: true,
  },
}, { timestamps: true });

const monthsToseconds = (months) => months * 30 * 24 * 60 * 60 ; // Convert months to milliseconds

Response = mongoose.model('Response', responseSchema);

// Create index with expireAfterSeconds using the monthsToMilliseconds function
responseSchema.index({ "createdAt": 1 }, { expireAfterSeconds: monthsToseconds(3) });

module.exports = Response;
