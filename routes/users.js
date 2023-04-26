const express = require('express');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/:id', ensureLoggedIn, usersController.show);

router.put('/:id', ensureLoggedIn, usersController.add);

router.delete('/:id', ensureLoggedIn, usersController.delete);

module.exports = router;
