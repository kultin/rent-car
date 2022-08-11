const express = require('express');
const { getAllBookings,createBooking } = require('../controllers/bookingsController');

const router = express.Router();

router.get('/', getAllBookings);

router.post('/', createBooking);

// router.get('/:id', getCarById);

// router.get('/mycars', getLessorCars);

module.exports = router;
