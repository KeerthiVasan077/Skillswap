const mongoose = require('mongoose');

const SwapRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offeredSkill: {
    type: String,
    required: true
  },
  wantedSkill: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);