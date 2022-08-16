const express = require('express');

const router = express.Router();

const {
  getAllCars, getCarById, getLessorCars, uploadNewCar,
} = require('../controllers/carsController');
const uploadCarsPhotoMiddleware = require('../middlewares/uploadCarsPhotoMiddleware');

router.get('/', getAllCars);

router.get('/:id', getCarById);
router.post('/new-car', uploadCarsPhotoMiddleware.array('file', 10), uploadNewCar);

router.get('/mycars', getLessorCars);

router.get('/mycars/edit/:id', getCarById);

module.exports = router;
