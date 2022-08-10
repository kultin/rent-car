const express = require('express');

const router = express.Router();

const { getAllTents } = require('../controllers/tentsController');

router.get('/', getAllTents);

module.exports = router;
