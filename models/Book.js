const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

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
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
