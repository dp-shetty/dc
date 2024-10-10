const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const defaultRoute = require("../routes/defaultRoutes");
const userEmailRoutes = require("../routes/emailUsersRoutes");
const emailVerifyRoute = require("../routes/emailVerifyRoutes");
const jwtVerifyRouter = require("../routes/jwtVerifyRouter");
const loginVerifyRoute = require("../routes/loginVerifyRouter");

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB().catch(error => {
  console.error("Error connecting to MongoDB:", error);
});

const corsOptions = {
  origin: ['https://dchalios.vercel.app','http://localhost:5173'], // Replace with your frontend URL
  credentials: true, // Allow credentials if you use cookies
  methods: ["GET", "POST", "OPTIONS"],
  optionsSuccessStatus: 200, // Specify the allowed methods
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", defaultRoute);
app.use("/api", userEmailRoutes);
app.use("/api", emailVerifyRoute);
app.use("/api", jwtVerifyRouter);
app.use("/api", loginVerifyRoute);

// Export the app as a Vercel function
module.exports = app;
