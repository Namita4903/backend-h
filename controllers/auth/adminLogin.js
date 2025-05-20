const User = require("../../models/user.model");
const { loginValidation } = require("../../services/validation_schema");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res, next) => {
  try {
    console.log("Entered admin login endpoint...");

    // Validate input
    const loginResponse = await loginValidation.validateAsync(req.body);
    const { email, password } = loginResponse;

    // Find the user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Admin not found. Please check the email.",
      });
    }

    console.log("Admin email found:", existingUser.email);

    // Only allow admin role
    if (existingUser.role !== "admin" && existingUser.role!=="user") {
        console.log("not an admin or user")
      return res.status(403).json({
        success: false,
        message: "Access denied. This panel is only for admins.",
      });
    }

    // Plaintext password comparison (for development only)
    if (password !== existingUser.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    console.log("yes login success...")

    return res.status(200).json({
      success: true,
      message: "Admin login successful 🎉",
      jwtToken,
      role: existingUser.role,
      userName: existingUser.username,
      userId: existingUser._id,
      userEmail: existingUser.email,
    });

  } catch (error) {
    console.error("Admin Login Error:", error);
    next(error);
  }
};

module.exports = adminLogin;
