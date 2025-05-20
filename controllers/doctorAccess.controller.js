const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/user.model"); 

const sendDoctorAccessEmail = async (req, res) => {
  const { email, doctorId,role } = req.body;

  if (!email || !doctorId) {
    return res.status(400).json({ message: "Missing email or doctor ID" });
  }
  if(role !=="doctor"){
    return res.status(400).json({ message: "Role Doctor Required !!" });

  }

  const token = crypto.randomBytes(20).toString("hex");

  const confirmationLink = `http://localhost:5173/doctor/confirm-access?email=${encodeURIComponent(email)}&doctorId=${doctorId}&token=${token}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Medical Tracker" <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Doctor Access Request",
      html: `
        <p>A doctor has requested access to your dashboard.</p>
        <p><a href="${confirmationLink}">Click here to confirm or deny</a></p>
      `,
    });

    res.status(200).json({ message: "Email sent to patient." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
};


module.exports = { sendDoctorAccessEmail };
