const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const reviewsController = require('../controllers/reviews');

router.post('/books/:id/reviews', ensureLoggedIn, reviewsController.create);

router.delete('/books/:id/reviews', ensureLoggedIn, reviewsController.delete);

module.exports = router;
