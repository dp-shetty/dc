const express = require("express");
const {
  authenticateJWT,
  getSession,
} = require("../controllers/jwtVerifyController");

const router = express.Router();

// Session route
router.get("/session", authenticateJWT, getSession);

module.exports = router;
