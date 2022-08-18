const express = require('express');

const router = express.Router();

const { editUser } = require('../controllers/editUserController');
const { uploadAvatar } = require('../controllers/imgController');
const uploadAvatarMiddleware = require('../middlewares/uploadAvatarMiddleware');

router.post('/', editUser);

router.post('/upload-avatar', uploadAvatarMiddleware.single('avatar'), uploadAvatar);

module.exports = router;
