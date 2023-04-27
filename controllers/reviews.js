const bookModel = require('../models/Book');

async function create(req, res) {
  const book = await bookModel.findById(req.params.id);
  req.body.user = [req.user._id];
  book.reviews.push(req.body);
  try {
    await book.save();
    res.redirect(`/books/${book._id}`);
  } catch {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = { create };
