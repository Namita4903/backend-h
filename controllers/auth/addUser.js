const User = require("../../models/user.model");
const { addUservalidation } = require("../../services/validation_schema");
const sendEmailForAddUser = require("../../services/sendEmailForAddUser");

const addUser = async (req, res, next) => {
  try {
    const validatedData = await addUservalidation.validateAsync(req.body);
    const { username, dob, email, password,gender,phone,confirmPassword, role } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered");
      return res.status(400).json({
        message: "User already registered. Please login.",
        isNewUser: false,
      });
    }

    // Store password directly (not recommended for production)
    const newUser = new User({
      username,
      dob,
      email,
      password, // Plain text (bad practice!)
      role,
      gender,phone,confirmPassword
    });

    await newUser.save();

    try {
      await sendEmailForAddUser(email, password);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    console.log("User Registered Successfully");
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      isNewUser: true,
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

module.exports = addUser;