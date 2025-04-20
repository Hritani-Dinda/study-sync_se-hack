// File: controllers/quizBattleController.js
const QuizBattleRoom = require('../models/QuizBattleRoom');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Generate a random room code
const generateRoomCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

exports.createRoom = async (req, res) => {
  try {
    const { quizId, hostId } = req.body;
    
    // Verify quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Generate a unique room code
    let roomCode;
    let isUnique = false;
    
    while (!isUnique) {
      roomCode = generateRoomCode();
      const existingRoom = await QuizBattleRoom.findOne({ roomCode });
      if (!existingRoom) {
        isUnique = true;
      }
    }
    
    // Create the room
    const room = new QuizBattleRoom({
      roomCode,
      quiz: quizId,
      host: hostId,
      players: [{ id: hostId, isHost: true, score: 0 }],
      status: 'waiting'
    });
    
    await room.save();
    
    res.status(201).json({
      roomCode,
      host: hostId,
      quiz: quizId,
      status: 'waiting'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { roomCode, playerId } = req.body;
    
    // Find the room
    const room = await QuizBattleRoom.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if the game has already started
    if (room.status !== 'waiting') {
      return res.status(400).json({ message: 'Game has already started' });
    }
    
    // Check if player is already in the room
    const playerExists = room.players.some(p => p.id === playerId);
    if (!playerExists) {
      room.players.push({ id: playerId, isHost: false, score: 0 });
      await room.save();
    }
    
    res.status(200).json({
      roomCode,
      host: room.host,
      players: room.players.length,
      status: room.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Error joining room', error: error.message });
  }
};

exports.getRoomDetails = async (req, res) => {
  try {
    const { roomCode } = req.params;
    
    const room = await QuizBattleRoom.findOne({ roomCode })
      .populate('quiz', 'title category timeLimit');
      
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.status(200).json({
      roomCode: room.roomCode,
      quiz: room.quiz,
      host: room.host,
      players: room.players.length,
      status: room.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room details', error: error.message });
  }
};

exports.startBattle = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { hostId } = req.body;
    
    const room = await QuizBattleRoom.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Verify that the request is from the host
    if (room.host !== hostId) {
      return res.status(403).json({ message: 'Only the host can start the game' });
    }
    
    // Update room status
    room.status = 'active';
    room.startTime = new Date();
    await room.save();
    
    // Room status updated successfully, socket will notify other players
    res.status(200).json({ message: 'Battle started' });
  } catch (error) {
    res.status(500).json({ message: 'Error starting battle', error: error.message });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { playerId, questionId, answer, timeSpent } = req.body;
    
    const room = await QuizBattleRoom.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Find the question and check if the answer is correct
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const isCorrect = answer === question.correctAnswer;
    
    // Calculate points - less time spent means more points
    const basePoints = question.points;
    let pointsEarned = 0;
    
    if (isCorrect) {
      // Time factor: 100% points if answered within 25% of total time, then decreasing
      const maxTime = room.quiz.timeLimit / question.length;
      const timeFactor = Math.max(0, 1 - (timeSpent / maxTime));
      pointsEarned = Math.round(basePoints * timeFactor);
    }
    
    // Update player's score
    const playerIndex = room.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      room.players[playerIndex].score += pointsEarned;
      
      // Add to player's answers
      room.players[playerIndex].answers = room.players[playerIndex].answers || [];
      room.players[playerIndex].answers.push({
        question: questionId,
        answer,
        isCorrect,
        points: pointsEarned,
        timeSpent
      });
      
      await room.save();
    }
    
    res.status(200).json({
      isCorrect,
      pointsEarned,
      correctAnswer: question.correctAnswer,
      totalScore: room.players[playerIndex]?.score || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer', error: error.message });
  }
};