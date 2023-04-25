const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Author',
      },
    ],
    genre: String,
    publishYear: {
      type: Number,
      min: 500,
    },
    pageCount: {
      type: Number,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
