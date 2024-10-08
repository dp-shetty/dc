const express = require('express');
const cors = require('cors');
const path = require("path");
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('../config/db');
require('dotenv').config();

const defaultRoute = require('../routes/defaultRoutes')
const userEmailRoutes = require('../routes/emailUsersRoutes');
const emailVerifyRoute = require('../routes/emailVerifyRoutes')

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Set up MongoDB session store
// const store = new MongoDBStore({
//   uri: process.env.MONGO_URI,
//   collection: 'sessions',
// });

// store.on('error', function (error) {
//   console.error(error);
// });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(session({
//   secret: process.env.JWT_SECC,
//   resave: false,
//   saveUninitialized: false,
//   store: store,
//   cookie: { secure: false, maxAge: 3600000 },
// }));

// Routes
app.use('/api', defaultRoute);
app.use('/api', userEmailRoutes);
app.use('/api', emailVerifyRoute);



// Export the app as a Vercel function
module.exports = app;
