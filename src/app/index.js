const express = require('express');
const { signup, signin, getAccessToken,  creditUserAccount, transfer, logout } = require('./controller');
const { authenticateUser, authorizeUser, verifyRefreshToken } = require('./middleWare');

const router = express.Router();


router.post('/signup', signup);

router.post('/signin', signin);

router.post('/refresh/token', verifyRefreshToken, getAccessToken);

router.post('/credit-acct', authenticateUser, authorizeUser(['admin']),  creditUserAccount);

router.post('/transfer', authenticateUser, authorizeUser(['user','admin']), transfer);

router.post('/logout', authenticateUser, logout)

module.exports = router;
