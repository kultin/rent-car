const express = require('express');
const router = express.Router();
const { addLike, deleteLike, getLikes, getUserLikes } = require('../controllers/likesController');

router.delete('/:id', deleteLike);
router.post('/:id', addLike);
router.get('/', getLikes);
router.get('/fav', getUserLikes);

module.exports = router;
