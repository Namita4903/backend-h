const express = require("express");
const Appointment = require("../../models/Appointment");
const router = express.Router();

// POST /api/appointments/book
const bookAppointment =async (req, res) => {
  try {
    const { username, email, userId, doctorPhone ,doctorEmail} = req.body;

    if (!username || !email || !userId || !doctorPhone || !doctorEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newAppointment = new Appointment({
      username,
      email,
      userId,
      doctorPhone,
      doctorEmail
    });

    await newAppointment.save();

    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Server error while booking appointment" });
  }
}
module.exports = bookAppointment;
