const userModel = require('../models/User');
const bookModel = require('../models/Book');

async function show(req, res) {
  try {
    await req.user.populate('booksRead');

    req.user.booksRead.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }});
    res.render('users/show', {
      title: `${req.user.username}'s Books`,
      user: req.user,
    });
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
}

async function deleteBook(req, res) {
  try {
    const bookIndex = req.user.booksRead.findIndex(function (id) {
      return id.toString() === req.params.id;
    });
    req.user.booksRead.splice(bookIndex, 1);
    req.user.save();
    res.redirect(`/users/${req.user._id}`);
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = {
  show,
  add,
  delete: deleteBook,
};
