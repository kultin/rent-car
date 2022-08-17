const express = require('express');
const router = express.Router();
const { getAllLikes, addLike, deleteLike } = require('../controllers/likesController');

router.patch('/:id', addLike);
router.delete('/:id', deleteLike);

module.exports = router;
