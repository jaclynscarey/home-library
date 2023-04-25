const userModel = require('../models/User');

async function show(req, res) {
  try {
    res.render('users/show', { title: 'User', user: req.user });
  } catch (err) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = { show };
