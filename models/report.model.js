const { Schema, model } = require("mongoose");

const ReportSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // Base64 or image URL
    required: true,
  },
  uploadedByDoctor: {
    type: String,
  },
  uploadedOfPatient: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Report", ReportSchema, "reports");
