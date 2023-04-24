const bookModel = require('../models/Book');
const authorModel = require('../models/Author');

async function index(req, res) {
  try {
    const books = await bookModel.find({});
    res.render('books/index', { books, title: 'Your Books' });
  } catch (err) {
    // TODO: Render error page
    res.send(err);
  }
}

async function create(req, res) {
  const authorDetail = {};
  authorDetail.firstName = req.body.firstName;
  authorDetail.lastName = req.body.lastName;
  authorDetail.booksWritten = [];

  const bookDetail = {};
  bookDetail.title = req.body.title;
  bookDetail.genre = req.body.genre;
  bookDetail.publishYear = Number(req.body.publishYear);
  bookDetail.pageCount = Number(req.body.pageCount);
  bookDetail.author = [];

  try {
    const author = await authorModel.create(authorDetail);
    const book = await bookModel.create(bookDetail);

    author.booksWritten.push(book._id);
    await author.save();

    book.author.push(author._id);
    await book.save();

    res.redirect('/books');
  } catch (err) {
    // TODO: Render error page
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const foundBook = await bookModel
      .findById(req.params.id)
      .populate('author');
    res.render('books/show', { b: foundBook, title: 'Book Details' });
  } catch (err) {
    res.send(err);
  }
}

module.exports = { index, create, show };
