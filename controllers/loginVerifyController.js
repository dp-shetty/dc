// src/controllers/loginVerifyController.js
const jwt = require("jsonwebtoken"); // Import JWT library
const User = require("../models/emailUsersModel"); // Adjust the import based on your User model
const generateJwtToken = require("../config/jwt");

const loginVerify = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Fetch the user from the database using userId and email
    const user = await User.findById(userId); // Adjust based on your User model's schema
    if (!user || user.email !== email) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    // Generate a new JWT token
    const jwtToken = generateJwtToken(user);

    // Send the token back to the client
    res.cookie("authToken", jwtToken, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only
      sameSite: "None", // Allow cross-domain (important for different domains)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ JWT_Token: token });
  } catch (error) {
    console.error("Error in loginVerify:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginVerify,
};
