const express = require('express');
const booksController = require('../controllers/books');
const isAdmin = require('../config/isAdmin');

const router = express.Router();

router.get('/', booksController.index);

router.post('/', isAdmin, booksController.create);

router.get('/:id/edit', isAdmin, booksController.edit);

router.get('/:id', booksController.show);

router.put('/:id', isAdmin, booksController.update);

router.delete('/:id', isAdmin, booksController.delete);

module.exports = router;
