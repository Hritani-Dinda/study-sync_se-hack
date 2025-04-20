// File: models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple', 'boolean', 'text'],
    default: 'multiple'
  },
  options: [String],  // For multiple choice questions
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: String,  // Optional explanation of the answer
  points: {
    type: Number,
    default: 5
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

module.exports = mongoose.model('Question', QuestionSchema);

// File: models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Category', CategorySchema);