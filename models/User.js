const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  booksRead: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);