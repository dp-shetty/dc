const loginUser = require("../models/emailUsersModel");
const generateJwtToken = require("../config/jwt");
const bcrypt = require("bcrypt"); // Import bcrypt for password comparison

const loginVerify = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request

    // Find the user with the provided email
    const user = await loginUser.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    // Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    // Generate JWT Token
    const jwtToken = generateJwtToken(user);

    // Send the token back in a cookie
    res.cookie("authToken", jwtToken, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only
      sameSite: "None", // Cross-domain support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds for testing
    });

    return res.json({ JWT_Token: jwtToken });
  } catch (error) {
    console.error("Error in loginVerify:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginVerify,
};
