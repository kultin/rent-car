const express = require('express');

const router = express.Router();

const { editUser } = require('../controllers/editUserController');
const { uploadAvatar } = require('../controllers/imgController');
const uploadImg = require('../middlewares/uploadImg');

router.post('/', editUser);

router.post('/upload-avatar', uploadImg.single('avatar'), uploadAvatar);

module.exports = router;
