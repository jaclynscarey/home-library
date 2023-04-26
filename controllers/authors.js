const authorModel = require('../models/Author');
const bookModel = require('../models/Book');

async function index(req, res) {
  try {
    const authors = await authorModel.find({}).populate('booksWritten');
    res.render('authors/index', { title: 'Authors', authors });
  } catch (error) {
    res.render('error', {title: 'Something Went Wrong'});
  }
}

async function show(req, res) {
  try {
    const foundAuthor = await authorModel.findById(req.params.id).populate('booksWritten');
    let fullName = `${foundAuthor.firstName} ${foundAuthor.middleName} ${foundAuthor.lastName}`;

    if (!foundAuthor.middleName) {
      fullName = `${foundAuthor.firstName} ${foundAuthor.lastName}`;
    }    

    res.render('authors/show', {
      author: foundAuthor,
      title: fullName,
    });
  } catch (error) {
    res.render('error', {title: 'Something Went Wrong'});
  }
}

module.exports = {
  index,
  show,
};
