const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
require("dotenv").config();

const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware configuration

// Configure CORS
app.use(
  cors({
    origin: frontendUrl, // Frontend domain
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
