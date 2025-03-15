const socialUser = require("../models/socialUsersModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendMail = require("../config/nodeMailer");

const getSocialUser = async (req, res) => {
  try {
    const SocialUsers = await socialUser.find();
    res.status(200).json(SocialUsers);
  } catch (error) {
    console.error(error);
  }
};

const backendUrl = process.env.BACKEND_BASE_URL;

const createSocialUser = async (req, res) => {
  const {
    email,
    provider,
    providerId,
    isVerified,
    profilePicture,
    displayName,
  } = req.body;

  try {
    const existingSocialUser = await socialUser.findOne({ email });
    if (existingSocialUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const verificationToken = crypto.randomBytes(32).toString("hex");

    const newSocialUser = socialUser({
      email,
      // password: hashedPassword,
      provider,
      providerId,
      isVerified,
      profilePicture,
      displayName,
      // verificationToken,
    });

    const savedSocialUser = await newSocialUser.save();

    const subject = "Welcome to D-CHALIOS 🤖!";

    const html = `
<div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #4CAF50;">Welcome to D-CHALIOS!</h1>
    <p style="font-size: 16px;">Thank you for choosing us. We're thrilled to have you on board!</p>
    <p style="font-size: 16px;">With our innovative AI solutions, you're set to <strong>unlock the brilliance of Chanakya’s wisdom</strong> and <strong>harness the limitless power of artificial intelligence</strong>. Prepare to <strong>transform challenges into opportunities</strong> and <strong>shine like the Sun</strong>.</p>
    <p style="font-size: 16px;">To get started, please verify your email by clicking the link below:</p>
    <p style="font-size: 14px;">If you have any questions, feel free to reach out to us.</p>
    <p style="font-size: 14px;">Best Regards,<br>D-CHALIOS Team</p>
</div>  
      `;

    await sendMail(`${email},dps2k811@gmail.com`, subject, html);
    res.status(201).json(savedSocialUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSocialUser, createSocialUser };
