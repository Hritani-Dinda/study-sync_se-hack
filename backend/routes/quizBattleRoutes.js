// File: routes/quizBattleRoutes.js
const express = require('express');
const router = express.Router();
const quizBattleController = require('../controllers/quizBattleController');

// Create a new battle room
router.post('/rooms', quizBattleController.createRoom);

// Join an existing battle room
router.post('/rooms/join', quizBattleController.joinRoom);

// Get room details
router.get('/rooms/:roomCode', quizBattleController.getRoomDetails);

// Start a battle
router.post('/rooms/:roomCode/start', quizBattleController.startBattle);

// Submit answer in battle
router.post('/rooms/:roomCode/answer', quizBattleController.submitAnswer);

module.exports = router;
