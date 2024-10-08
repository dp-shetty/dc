const emailUser = require("../models/emailUsersModel");
const path = require("path");
const frontendUrl = process.env.FRONTEND_URL;
const generateJwtToken = require("../config/jwt");

const getMailVerified = async (req, res) => {
  const { token, email } = req.query;
  if (!token || !email) {
    return res.status(400).send("Invalid verification link.");
  }

  try {
    const user = await emailUser.findOne({ email, verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .sendFile(path.join(__dirname, "../public", "linkDoesntExist.html"));
    }
    user.isVerified = true;
    const jwtToken = generateJwtToken(user);
    await user.save();

    // Set JWT token as HttpOnly cookie for cross-domain
    res.cookie("authToken", jwtToken, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only
      sameSite: "None", // Allow cross-domain (important for different domains)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.header("Access-Control-Allow-Origin", frontendUrl); // Frontend URL
    res.header("Access-Control-Allow-Credentials", "true");

    res.status(200).sendFile(path.join(__dirname, "../public", "verificationSuccess.html"))
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = getMailVerified;
