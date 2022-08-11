const express = require('express');

const router = express.Router();

const { getAllCars, getCarById, getLessorCars } = require('../controllers/carsController');
const { uploadCarPhotos } = require('../controllers/imgController');
const uploadCarsPhotoMiddleware = require('../middlewares/uploadCarsPhotoMiddleware');

router.get('/', getAllCars);

router.get('/:id', getCarById);
router.post('/upload-photos', uploadCarsPhotoMiddleware.any('photos'), uploadCarPhotos);

router.get('/mycars', getLessorCars);

module.exports = router;
