const jwt = require("jsonwebtoken"); // Import JWT package

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  // Generate and return the token
  return jwt.sign(payload, process.env.JWT_SECC, {
    expiresIn: "7d", // Token expiry time
  });
};

module.exports = generateToken;
