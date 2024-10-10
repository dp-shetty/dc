const jwt = require("jsonwebtoken"); // Import JWT library

const getSession = (req, res) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECC, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json({ JWT_Token: token });
  });
};


module.exports = {
  getSession,
};
