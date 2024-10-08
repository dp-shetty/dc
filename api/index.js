const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
require("dotenv").config();

const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");

// Get frontend URLs from environment variables
const frontendUrl = process.env.FRONTEND_URL; // e.g., "https://dchalios.vercel.app"
const frontendLogin = process.env.FRONTEND_LOGIN;
const frontendLoginAuth = process.env.FRONTEND_LOGIN_AUTH;
const frontendSignup = process.env.FRONTEND_SIGNUP;
const frontendSignupAuth = process.env.FRONTEND_SIGNUP_AUTH;
const frontendAi = process.env.FRONTEND_AI_URL;

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware configuration
const allowedOrigins = [
  frontendUrl,
  frontendLogin,
  frontendLoginAuth,
  frontendSignup,
  frontendSignupAuth,
  frontendAi,
];

// Configure CORS
app.use(
  cors({
    origin: allowedOrigins, // Allow multiple frontend URLs
    credentials: true, // Allow credentials (cookies) to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
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
