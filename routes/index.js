const express = require('express');
const indexController = require('../controllers/index');

const router = express.Router();
const passport = require('passport');

router.get('/', indexController.home);

router.get('/auth/google', passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
    }
  ));

  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/books',
      failureRedirect: '/books'
    }
  ));

  router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/movies');
    });
  });

module.exports = router;
