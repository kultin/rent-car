const express = require('express');
const router = express.Router();
const { getAllLikes,addLike, deleteLike  } = require('../controllers/likesController');

router.post('/:id', addLike);
router.delete('/:id', deleteLike);

module.exports = router;
