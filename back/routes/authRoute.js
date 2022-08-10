const express = require('express');

const router = express.Router();

const { login } = require('../controllers/loginController');

const { registration } = require('../controllers/registrationController');

const { getuser } = require('../controllers/getuserController');

const { logout } = require('../controllers/logoutController');

router.post('/login', login);

router.post('/registration', registration);

router.get('/getuser', getuser);

router.get('/logout', logout);

module.exports = router;
