const userModel = require('../models/User');

async function show(req, res) {
  try {
    await req.user.populate('booksRead');
    res.render('users/show', { title: 'User', user: req.user });
  } catch (err) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function add(req, res) {
  try {
    const user = req.user;
    user.booksRead.push(req.params.id);
    user.save();
    res.redirect('/books');

  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
};

module.exports = {
  show,
  add
};
