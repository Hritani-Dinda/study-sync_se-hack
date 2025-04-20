// File: models/QuizBattleRoom.js
const mongoose = require('mongoose');

const QuizBattleRoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  host: {
    type: String,
    required: true
  },
  players: [{
    id: String,
    name: String,
    isHost: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    answers: [{
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      answer: String,
      isCorrect: Boolean,
      points: Number,
      timeSpent: Number // Time spent in seconds
    }]
  }],
  status: {
    type: String,
    enum: ['waiting', 'active', 'completed'],
    default: 'waiting'
  },
  currentQuestion: {
    type: Number,
    default: 0
  },
  startTime: Date,
  endTime: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Room will expire after a certain period (e.g., 24 hours)
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
  }
});

module.exports = mongoose.model('QuizBattleRoom', QuizBattleRoomSchema);