const userModel = require("../models/user.model");

const handleConfirmation = async (req, res) => {
  const {  doctorId, email} = req.body;
  console.log(req.body)
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send("Patient not found.");

    const alreadyAllowed = user.allowedDoctors.some(
      (doc) => doc._id?.toString() === doctorId
    );

    if (alreadyAllowed) {
      return res.send(`<h2>Doctor already has access to ${email}'s dashboard.</h2>`);
    }

    const doctor = await userModel.findById(doctorId);
    console.log(doctor)
    if (!doctor) return res.status(404).send("Doctor not found.");

    // Add embedded doctor info
    user.allowedDoctors.push({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
    });

    await user.save();

    res.send(`<h2>Access granted to Doctor ${doctor.username} for patient ${user.email}</h2>`);
  } catch (error) {
    console.error("Error confirming access:", error);
    res.status(500).send("Internal server error.");
  }
};

  module.exports = handleConfirmation