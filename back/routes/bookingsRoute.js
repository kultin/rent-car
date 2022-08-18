const express = require('express');
const { cancelBooking, closedBooking, getAllBookings, createBooking, applyBooking, getCarBookings } = require('../controllers/bookingsController');

const router = express.Router();

router.get('/', getAllBookings);

router.post('/', createBooking);

router.get('/all', getCarBookings);

router.post('/applyBooking', applyBooking);

router.post('/cancelBooking', cancelBooking);

router.post('/closedBooking', closedBooking);

module.exports = router;
