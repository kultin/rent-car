const express = require('express');

const router = express.Router();

const {
  getAllCars, getCarById, getLessorCars, uploadNewCar, editCar, deleteCar, deleteCarPhoto,
} = require('../controllers/carsController');
const uploadCarsPhotoMiddleware = require('../middlewares/uploadCarsPhotoMiddleware');

router.get('/', getAllCars);

router.get('/:id', getCarById);
router.post('/new-car', uploadCarsPhotoMiddleware.array('file', 10), uploadNewCar);

router.get('/mycars', getLessorCars);

router.post('/mycars/edit/', uploadCarsPhotoMiddleware.array('file', 10), editCar);
router.delete('/mycars/delete', deleteCar);

router.delete('/mycars/photo/delete', deleteCarPhoto);

module.exports = router;
