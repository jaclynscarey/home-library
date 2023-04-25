const express = require('express');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', ensureLoggedIn, usersController.index);

module.exports = router;
