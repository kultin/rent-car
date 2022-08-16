const express = require('express');
const { getAllBookings, createBooking, applyBooking, getCarBookings } = require('../controllers/bookingsController');

const router = express.Router();

router.get('/', getAllBookings);

router.post('/', createBooking);

router.get('/all', getCarBookings);

router.post('/applyBooking', applyBooking);


module.exports = router;
