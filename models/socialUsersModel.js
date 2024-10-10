const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const socialUsersShema = Schema({
  email: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  profilePicture: { type: String, required: false },
  displayName: { type: String, required: false },
})

module.exports = model("social-users",socialUsersShema)