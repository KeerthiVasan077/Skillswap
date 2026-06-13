const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);