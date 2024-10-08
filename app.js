const express = require('express');
const cors = require('cors');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const connectDB = require('./config/db');
require('dotenv').config();

// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
const defaultRoute = require('./routes/defaultRoutes')

// Initialize the app
const app = express();

// Connect to MongoDB
// connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
// app.use('/api', userRoutes);
// app.use('/api', authRoutes);
app.use('/api', defaultRoute);

// Start the server (for local development)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
