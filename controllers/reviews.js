const bookModel = require('../models/Book');

async function create(req, res) {
  const book = await bookModel.findById(req.params.id);
  book.reviews.push(req.body);
  try {
    await book.save();
  } catch {
    res.render('error', { title: 'Something Went Wrong' });
  }
  res.redirect(`/books/${book._id}`);
}

module.exports = { create };
