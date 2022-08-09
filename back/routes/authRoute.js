const express = require('express');

const router = express.Router();

const { login } = require('../controllers/loginController');

const { registration } = require('../controllers/registrationController');

router.post('/login', login);

router.post('/registration', registration);

module.exports = router;
