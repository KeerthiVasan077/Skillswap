const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  skillsOffered: [String],
  skillsWanted: [String],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);