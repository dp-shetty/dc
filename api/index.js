const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import Routes
const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");
const jwtVerifyRouter = require("../routes/jwtVerifyRouter");
const loginVerifyRoute = require("../routes/loginVerifyRouter");
const socialUserRoute = require("../routes/socialUsersRoutes");

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// CORS Configuration
const corsOptions = {
  origin: ['https://dchalios.vercel.app', 'http://localhost:5173'], // Update as needed
  credentials: true, // Allow credentials for cookies
  methods: ["GET", "POST", "OPTIONS"], // Allowed methods
  optionsSuccessStatus: 200, // CORS success response
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Define Routes
app.use("/api", defaultRoute);
app.use("/api", userEmailRoutes);
app.use("/api", emailVerifyRoute);
app.use("/api", jwtVerifyRouter);
app.use("/api", loginVerifyRoute);
app.use("/api", socialUserRoute);

// Export the app as a Vercel function
module.exports = app;
