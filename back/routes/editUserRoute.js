const express = require('express');

const router = express.Router();

const { editUser } = require('../controllers/editUserController');

router.post('/', editUser);

module.exports = router;
