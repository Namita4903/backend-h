const Appointment = require("../../models/Appointment");

// GET /api/appointments
const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json({appointments,length:appointments.length});
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Server error while fetching appointments" });
  }
}
module.exports = getAppointment