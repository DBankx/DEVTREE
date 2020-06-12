const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  username: {
    type: String,
    required: true,
    max: 10
  },
  email: {
    required: true,
    type: String
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    min: 5
  },
  date: {
    type: Date,
    default: Date.now
  },
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ]
});

module.exports = User = mongoose.model('user', userSchema);
