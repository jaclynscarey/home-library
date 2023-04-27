const bookModel = require('../models/Book');

async function create(req, res) {
  const book = await bookModel.findById(req.params.id);
  const userId = req.user._id;
  const bookDetail = {
    ...req.body,
    userId,
  };
  book.reviews.push(bookDetail);
  try {
    await book.save();
  } catch {
    res.render('error', { title: 'Something Went Wrong' });
  }
  res.redirect(`/books/${book._id}`);
}

module.exports = { create };
