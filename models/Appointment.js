const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  doctorPhone: {
    type: String,
    required: true,
  },
    doctorEmail: {
    type: String,
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
