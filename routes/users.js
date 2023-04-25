const express = require('express');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/:id', ensureLoggedIn, usersController.show);

module.exports = router;
