const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const { uploadSingle } = require('../controllers/imgController');

router.post('/single', upload.single('avatar'), uploadSingle);

module.exports = router;
