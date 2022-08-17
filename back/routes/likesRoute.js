const express = require('express');
const router = express.Router();
const { addLike, deleteLike, getLikes } = require('../controllers/likesController');

router.delete('/:id', deleteLike);
router.post('/:id', addLike);
router.get('/', getLikes);

module.exports = router;
