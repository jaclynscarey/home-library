const express = require('express');
const booksController = require('../controllers/books');

const router = express.Router();

router.get('/', booksController.index);

router.post('/', booksController.create);

router.get('/:id', booksController.show);

router.put('/:id', booksController.update);

router.delete('/:id', booksController.delete);

module.exports = router;
