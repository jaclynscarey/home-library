const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  genre: String,
  publishYear: {
    type: Number,
    max: function () {
      return new Date().getFullYear();
    },
  },
  pageCount: {
    type: Number,
    min: 1,
  },
});

module.exports = mongoose.model('Book', bookSchema);
