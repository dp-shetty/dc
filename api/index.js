const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
require("dotenv").config();

const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");

// Define allowed origins
const frontendUrl = process.env.FRONTEND_URL;
const frontendLogin = process.env.FRONTEND_LOGIN;
const frontendLoginAuth = process.env.FRONTEND_LOGIN_AUTH;
const frontendSignup = process.env.FRONTEND_SIGNUP;
const frontendSignupAuth = process.env.FRONTEND_SIGNUP_AUTH;
const frontendAi = process.env.FRONTEND_AI_URL;


// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow requests from the frontend URL only
  if (origin === frontendUrl) {
    res.header("Access-Control-Allow-Origin", frontendUrl);
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies)
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: frontendUrl, // Frontend domain
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Routes
app.use("/api", defaultRoute);
app.use("/api", userEmailRoutes);
app.use("/api", emailVerifyRoute);

// Export the app as a Vercel function
module.exports = app;
