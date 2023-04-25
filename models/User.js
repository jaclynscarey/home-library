const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    booksRead: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
