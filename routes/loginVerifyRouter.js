const express = require("express");
const { loginVerify } = require("../controllers/loginVerifyController");

const router = express.Router();

// Login verify route
router.post("/loginverify", loginVerify); // Only use POST for login

module.exports = router;
