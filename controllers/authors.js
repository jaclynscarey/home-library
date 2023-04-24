const authorModel = require('../models/Author');

async function index(req, res) {
    try {
        const authors = await authorModel.find({});
        res.render('authors/index', { title: 'Authors', authors });
    } catch (error) {
        // TODO add error page
        res.send(error);
    }
};

module.exports = {
    index,
};