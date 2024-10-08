const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const emailUsersShema = Schema({
  email : {type:String,required:true},
  password : {type:String,required:true},
  verificationToken: { type: String, required: false }, // Store verification token
  isVerified: { type: Boolean, default: false }, // Track verification status
})

module.exports = model("email-users",emailUsersShema)