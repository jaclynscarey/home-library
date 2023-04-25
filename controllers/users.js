const userModel = require('../models/User');

async function update(req, res) {
  try {
    const user = req.user;
    user.booksRead.push(req.body);
    await user.save();
    console.log(req.body);    
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });    
  }
}

async function show(req, res) {
  try {
    await req.user.populate('booksRead');
    res.render('users/show', { title: 'User', user: req.user });
  } catch (err) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = { 
  show,
  update,
};
