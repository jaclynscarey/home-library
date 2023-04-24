const bookModel = require('../models/Book');

async function index(req, res) {
  try {
    const books = await bookModel.find({});
    res.render('books/index', { books });
  } catch (err) {
    // TODO: Render error page
    res.send(err);
  }
}

module.exports = { index };