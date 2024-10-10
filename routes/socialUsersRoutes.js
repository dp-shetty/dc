const express = require('express');
const { getSocialUser, createSocialUser } = require('../controllers/socialUsersController');

const router = express.Router();

router.get('/email-users', getSocialUser);
router.post('/email-users', createSocialUser);

module.exports = router;