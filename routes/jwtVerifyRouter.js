const express = require("express");
const { getSession } = require("../controllers/jwtVerifyController");

const router = express.Router();

// Session route
router.get("/session", getSession);

module.exports = router;
