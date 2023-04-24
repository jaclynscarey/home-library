const authorModel = require('../models/Author');
const bookModel = require('../models/Book');

async function index(req, res) {
  try {
    const authors = await authorModel.find({}).populate('booksWritten');
    res.render('authors/index', { title: 'Authors', authors });
  } catch (error) {
    // TODO add error page
    console.log(error);
    // res.send(error);
  }
}

async function show(req, res) {
  try {
    const foundAuthor = await authorModel.findById(req.params.id).populate('booksWritten');
    const fullName = `${foundAuthor.firstName} ${foundAuthor.lastName}`;

    res.render('authors/show', {
      author: foundAuthor,
      title: fullName,
    });
  } catch (error) {
    // TODO add error page
    res.send(error);
  }
}

module.exports = {
  index,
  show,
};
