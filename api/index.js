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

// Middleware
// Configure CORS to allow requests from specific origins
const allowedOrigins = ['https://dchalios.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // Allow cookies to be sent if necessary
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", defaultRoute);
app.use("/api", userEmailRoutes);
app.use("/api", emailVerifyRoute);

// Export the app as a Vercel function
module.exports = app;
