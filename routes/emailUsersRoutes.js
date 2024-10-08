const express = require('express');
const { getEmailUser, createEmailUser } = require('../controllers/emailUserController');

const router = express.Router();

router.get('/email-users', getEmailUser);
router.post('/email-users', createEmailUser);

module.exports = router;
