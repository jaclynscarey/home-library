const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  ],
  genre: String,
  publishYear: {
    type: Number,
    min: 500,
    max: function () {
      return;
    },
  },
  pageCount: {
    type: Number,
    min: 1,
  },
});

module.exports = mongoose.model('Book', bookSchema);
