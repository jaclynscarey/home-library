const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  booksWritten: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Author', authorSchema);
