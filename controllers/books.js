const bookModel = require('../models/Book');
const authorModel = require('../models/Author');

async function index(req, res) {
  try {
    const books = await bookModel.find({}).populate('author');
    res.render('books/index', { books, title: 'Your Books' });
  } catch (err) {
    // TODO: Render error page
    res.send(err);
  }
}

async function create(req, res) {
  const authorNames = req.body.authorName.trim().split(/\s*,\s*/);
  const authorObjects = [];
  for (let author of authorNames) {
    const authorDetail = {};
    const authorName = author.split(' ');
    authorDetail.firstName = authorName[0];
    authorDetail.lastName = authorName[1];
    authorDetail.booksWritten = [];
    authorObjects.push(authorDetail);
  }

  const bookDetail = {};
  bookDetail.title = req.body.title;
  bookDetail.genre = req.body.genre;
  bookDetail.publishYear = Number(req.body.publishYear);
  bookDetail.pageCount = Number(req.body.pageCount);
  bookDetail.author = [];

  try {
    const book = await bookModel.create(bookDetail);

    for (let authorDetail of authorObjects) {
      const author = await authorModel.create(authorDetail);
      author.booksWritten.push(book._id);
      await author.save();

      book.author.push(author._id);
      await book.save();
    }

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
