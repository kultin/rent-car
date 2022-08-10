const express = require('express');
const { getAllBookings } = require('../controllers/bookingsController');

const router = express.Router();

router.get('/', getAllBookings);

// router.get('/:id', getCarById);

// router.get('/mycars', getLessorCars);

module.exports = router;
