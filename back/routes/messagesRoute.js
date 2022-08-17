const express = require('express');
const { getMessages, sendMessage, readMessages } = require('../controllers/messagesController');

const router = express.Router();

router.post('/getmessages', getMessages);

// router.options('/sendmessage', sendMessage);

router.post('/sendmessage', sendMessage);

router.post('/readmessages', readMessages);

// router.post('/', createBooking);

// router.post('/applyBooking', applyBooking);

// router.get('/:id', getCarById);

// router.get('/mycars', getLessorCars);

module.exports = router;
