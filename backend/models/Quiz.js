// File: models/Quiz.js
const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  timeLimit: {
    type: Number,  // Time limit in minutes
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  points: {
    type: Number,
    default: 0  // Total points available
  },
  status: {
    type: String,
    enum: ['draft', 'open', 'not_yet_open', 'closed'],
    default: 'draft'
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total points before saving
QuizSchema.pre('save', async function(next) {
  if (this.isModified('questions')) {
    const Question = mongoose.model('Question');
    const questions = await Question.find({ _id: { $in: this.questions } });
    this.points = questions.reduce((sum, q) => sum + q.points, 0);
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quiz', QuizSchema);