const express = require('express');
const defaultVision = require('../controllers/defaultController');

const router = express.Router();

router.get('/', defaultVision);

module.exports = router;
