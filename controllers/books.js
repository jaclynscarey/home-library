const bookModel = require('../models/Book');
const authorModel = require('../models/Author');

async function index(req, res) {
  try {
    const books = await bookModel.find({}).sort('title').populate('author');
    const authors = await authorModel.find({});
    res.render('books/index', { books, authors, title: 'Library' });
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

function createNewAuthorDetails(authorBody) {
  const authorNames = authorBody.trim().split(/\s*,\s*/);
  const authorObjects = [];

  for (let author of authorNames) {
    if (author === '') {
      continue;
    }
    const authorDetail = {};
    const authorName = author.split(' ');
    authorDetail.firstName = authorName[0];
    if (authorName.length > 1) {
      authorDetail.lastName = authorName[authorName.length - 1];
      let middleNames = [];
      for (let i = 1; i < authorName.length - 1; i++) {
        middleNames.push(authorName[i]);
      }
      if (middleNames.length > 0) {
        authorDetail.middleName = middleNames.join(' ');
      }
    }
    authorDetail.booksWritten = [];
    authorObjects.push(authorDetail);
  }

  return authorObjects;
}

function createBookDetail(bookBody) {
  const bookDetail = {};
  bookDetail.title = bookBody.title;
  bookDetail.genre = bookBody.genre;
  bookDetail.publishYear = Number(bookBody.publishYear);
  bookDetail.pageCount = Number(bookBody.pageCount);
  bookDetail.author = [];

  return bookDetail;
}

function refactorExistingAuthors(existingAuthorBody) {
  let existingAuthors = existingAuthorBody;
  if (typeof existingAuthors === 'string' && existingAuthors !== '') {
    existingAuthors = existingAuthors.split();
  }
  return existingAuthors;
}

async function create(req, res) {
  const authorObjects = createNewAuthorDetails(req.body.authorName);
  const bookDetail = createBookDetail(req.body);
  let existingAuthors = refactorExistingAuthors(req.body.existingAuthors);

  try {
    const book = await bookModel.create(bookDetail);

    if (existingAuthors) {
      existingAuthors.forEach(async function (authorId) {
        book.author.push(authorId);

        const author = await authorModel.findById(authorId);
        author.booksWritten.push(book._id);
        await author.save();
      });
      await book.save();
    }

    for (let authorDetail of authorObjects) {
      const author = await authorModel.create(authorDetail);
      author.booksWritten.push(book._id);
      await author.save();

      book.author.push(author._id);
      await book.save();
    }

    res.redirect('/books');
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function show(req, res) {
  try {
    const foundBook = await bookModel
      .findById(req.params.id)
      .populate('author');

    res.render('books/show', {
      b: foundBook,
      title: 'Book Details',
    });
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function deleteBook(req, res) {
  try {
    const book = await bookModel.findById(req.params.id).populate('author');

    for (const author of book.author) {
      if (author.booksWritten.length === 1) {
        await authorModel.findByIdAndDelete(author._id);
        continue;
      }

      const bookIndex = author.booksWritten.findIndex(function (id) {
        return id.toString() === req.params.id;
      });
      author.booksWritten.splice(bookIndex, 1);
      await author.save();
    }

    await bookModel.findByIdAndDelete(req.params.id);

    res.redirect('/books');
  } catch {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function edit(req, res) {
  try {
    const foundBook = await bookModel
      .findById(req.params.id)
      .populate('author');

    const authors = await authorModel.find({});

    res.render('books/edit', {
      authors,
      b: foundBook,
      title: 'Edit Book Details',
    });
  } catch (error) {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

async function update(req, res) {
  const authorObjects = createNewAuthorDetails(req.body.authorName);
  const bookDetail = createBookDetail(req.body);
  let existingAuthors = refactorExistingAuthors(req.body.existingAuthors);

  try {
    const book = await bookModel.findById(req.params.id).populate('author');
    const savedAuthors = [];

    // Remove book from existing authors' booksWritten
    for (const author of book.author) {
      savedAuthors.push(author);
      const bookIndex = author.booksWritten.findIndex(function (id) {
        return id.toString() === req.params.id;
      });
      author.booksWritten.splice(bookIndex, 1);
      await author.save();
    }

    // Reset book authors
    book.author = [];
    await book.save();

    // Add book to (new) existing authors' booksWritten
    // Add author to book
    if (existingAuthors) {
      existingAuthors.forEach(async function (authorId) {
        book.author.push(authorId);

        const author = await authorModel.findById(authorId);
        author.booksWritten.push(book._id);
        await author.save();
      });

      await book.save();
    }

    // Create new author and add book to author's booksWritten
    // Add author to book
    for (let authorDetail of authorObjects) {
      const author = await authorModel.create(authorDetail);
      author.booksWritten.push(book._id);
      await author.save();

      book.author.push(author._id);
      await book.save();
    }

    // Delete authors with no books
    for (const author of savedAuthors) {
      if (author.booksWritten.length === 0) {
        await authorModel.findByIdAndDelete(author._id);
      }
    }

    res.redirect(`/books/${req.params.id}`);
  } catch {
    res.render('error', { title: 'Something Went Wrong' });
  }
}

module.exports = { index, create, show, delete: deleteBook, edit, update };
