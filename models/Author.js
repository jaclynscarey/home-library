const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: {
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
});

module.exports = mongoose.model('Author', authorSchema);
