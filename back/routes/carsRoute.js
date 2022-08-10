const express = require('express');

const router = express.Router();

const { getAllCars, getCarById, getLessorCars } = require('../controllers/carsController');

router.get('/', getAllCars);

router.get('/:id', getCarById);

router.get('/mycars', getLessorCars);

module.exports = router;
