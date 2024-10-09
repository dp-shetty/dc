
const jwt = require("jsonwebtoken");
const emailUser = require("../models/emailUsersModel");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.authToken; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECC, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Fetch user data if needed
    const foundUser = await emailUser.findById(user.id); // Assuming the JWT contains the user's ID
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = foundUser; // Attach the user to the request object
    next();
  });
};

// Controller for the /session route
const getSession = (req, res) => {
  res.json({ JWT_Token: req.cookies.authToken, user: req.user });
};

module.exports = {
  authenticateJWT,
  getSession,
};
