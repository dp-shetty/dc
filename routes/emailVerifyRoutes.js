const express = require('express');
const getEmailVerified = require('../controllers/emailVerifyController');
const router = express.Router();

router.get('/email-verify', getEmailVerified);

module.exports = router;