const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    booksWritten: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Author', authorSchema);
