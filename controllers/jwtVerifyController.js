const getSession = (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ JWT_Token: req.cookies.authToken });
};

module.exports = {
  getSession,
};
