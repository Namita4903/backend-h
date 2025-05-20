const User = require("../../models/user.model");
const { loginValidation } = require("../../services/validation_schema");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    console.log("Entered login endpoint...");

    // Validate input
    const loginResponse = await loginValidation.validateAsync(req.body);
    const { email, password } = loginResponse;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email. Please register first.",
      });
    }

    console.log("Email found:", existingUser.email);

    // Plaintext password comparison (not secure – only for testing/dev)
    if (password !== existingUser.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Allow only admin or user roles
    const allowedRoles =  ["user", "patient", "doctor", "admin"];

    if (!allowedRoles.includes(existingUser.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admin and user roles are allowed.",
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

    return res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      jwtToken,
      role: existingUser.role,
      userName: existingUser.username,
      userId:existingUser._id,
      userEmail:existingUser?.email
    });

  } catch (error) {
    console.error("Login Error:", error);
    next(error);
  }
};

module.exports = login;
