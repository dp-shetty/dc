const emailUser = require("../models/emailUsersModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendMail  = require("../config/nodeMailer");

const getEmailUser = async (req, res) => {
  try {
    const emailUsers = await emailUser.find();
    res.status(200).json(emailUsers);
  } catch (error) {
    console.error(error);
  }
};

const createEmailUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingEmailUser = await emailUser.findOne({ email });
    if (existingEmailUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newEmailUser = emailUser({
      email,
      password: hashedPassword,
      verificationToken,
    });

    const savedEmailUser = await newEmailUser.save();

    const subject = "Welcome to D-CHALIOS 🤖!";

    const verificationLink = `https://dc-dpshetty.vercel.app/api/email-verify?token=${verificationToken}&email=${email}`;

    const html = `
<div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #4CAF50;">Welcome to D-CHALIOS!</h1>
    <p style="font-size: 16px;">Thank you for choosing us. We're thrilled to have you on board!</p>
    <p style="font-size: 16px;">With our innovative AI solutions, you're set to <strong>unlock the brilliance of Chanakya’s wisdom</strong> and <strong>harness the limitless power of artificial intelligence</strong>. Prepare to <strong>transform challenges into opportunities</strong> and <strong>shine like the Sun</strong>.</p>
    <p style="font-size: 16px;">To get started, please verify your email by clicking the link below:</p>
    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
    <p style="font-size: 14px;">If you have any questions, feel free to reach out to us.</p>
    <p style="font-size: 14px;">Best Regards,<br>D-CHALIOS Team</p>
</div>  
      `;

    sendMail(`${email},dpsd870@gmail.com`, subject, html);

    res.status(201).json(savedEmailUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmailUser, createEmailUser };
