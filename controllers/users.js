const userModel = require('../models/User');

async function show(req, res) {
  try {
    const user = await userModel.findById(req.params.id);
    res.render('users/show', { title: 'User', user });
  } catch (err) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = { show };
