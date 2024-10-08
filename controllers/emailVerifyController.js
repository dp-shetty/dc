const emailUser = require("../models/emailUsersModel");
const path = require("path");

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
    await user.save();
    res.sendFile(path.join(__dirname, "../public", "verificationSuccess.html"));
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = getMailVerified;
