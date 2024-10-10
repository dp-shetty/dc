const express = require('express');
const { getSocialUser, createSocialUser } = require('../controllers/socialUsersController');

const router = express.Router();

router.get('/social-users', getSocialUser);
router.post('/social-users', createSocialUser);

module.exports = router;