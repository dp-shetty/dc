const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
require("dotenv").config();

const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");

// Get frontend URLs from environment variables
const frontendUrl = process.env.FRONTEND_URL; // "https://dchalios.vercel.app"

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware
app.use(
  cors({
    origin: [
      frontendUrl, 
      process.env.FRONTEND_LOGIN, 
      process.env.FRONTEND_LOGIN_AUTH,
      process.env.FRONTEND_SIGNUP,
      process.env.FRONTEND_SIGNUP_AUTH,
      process.env.FRONTEND_AI_URL,
    ], // Allow multiple frontend URLs
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", defaultRoute);
app.use("/api", userEmailRoutes);
app.use("/api", emailVerifyRoute);

// Export the app as a Vercel function
module.exports = app;
