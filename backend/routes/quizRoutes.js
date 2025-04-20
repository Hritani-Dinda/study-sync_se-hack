// File: routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get quiz by ID
router.get('/:id', quizController.getQuizById);

// Create a new quiz
router.post('/', quizController.createQuiz);

// Update a quiz
router.put('/:id', quizController.updateQuiz);

// Delete a quiz
router.delete('/:id', quizController.deleteQuiz);

// Get quiz questions
router.get('/:id/questions', quizController.getQuizQuestions);

// Submit quiz answers
router.post('/:id/submit', quizController.submitQuizAnswers);

module.exports = router;