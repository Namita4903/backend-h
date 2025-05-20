const User = require('../../models/user.model');

// ✅ Pure controller function
const getAllowedDoctors = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const patient = await User.findOne({ email, role: "patient" });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient.allowedDoctors || []);
  } catch (error) {
    console.error("Error fetching allowed doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllowedDoctors;
