// File: sockets/quizBattleHandler.js
const QuizBattleRoom = require('../models/QuizBattleRoom');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

module.exports = (io) => {
  // Quiz Battle namespace
  const quizBattle = io.of('/quiz-battle');
  
  quizBattle.on('connection', (socket) => {
    console.log('New client connected to quiz battle:', socket.id);
    
    // Join a room
    socket.on('join-room', async ({ roomCode, playerId, playerName }) => {
      try {
        // Add player to room in database
        const room = await QuizBattleRoom.findOne({ roomCode });
        
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        
        // Join the socket room
        socket.join(roomCode);
        
        // Add player to database if not exists
        const playerExists = room.players.some(p => p.id === playerId);
        if (!playerExists) {
          room.players.push({
            id: playerId,
            name: playerName,
            isHost: false,
            score: 0,
            answers: []
          });
          await room.save();
        }
        
        // Notify room about new player
        quizBattle.to(roomCode).emit('player-joined', {
          playerId,
          playerName,
          playerCount: room.players.length
        });
        
        // Send room info back to player
        socket.emit('room-joined', {
          roomCode,
          quiz: room.quiz,
          host: room.host,
          players: room.players.map(p => ({
            id: p.id,
            name: p.name,
            isHost: p.isHost,
            score: p.score
          })),
          status: room.status
        });
      } catch (error) {
        socket.emit('error', { message: 'Error joining room', error: error.message });
      }
    });
    
    // Start game (host only)
    socket.on('start-game', async ({ roomCode, hostId }) => {
      try {
        const room = await QuizBattleRoom.findOne({ roomCode });
        
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        
        // Verify host
        if (room.host !== hostId) {
          socket.emit('error', { message: 'Only the host can start the game' });
          return;
        }
        
        // Get quiz details
        const quiz = await Quiz.findById(room.quiz).populate('questions');
        
        // Update room status
        room.status = 'active';
        room.startTime = new Date();
        room.currentQuestion = 0;
        await room.save();
        
        // Send first question to all players
        const questions = await Question.find({ quiz: room.quiz })
          .select('-correctAnswer');
                
        // Notify all players that game is starting
        quizBattle.to(roomCode).emit('game-started', {
          quiz: {
            id: quiz._id,
            title: quiz.title,
            timeLimit: quiz.timeLimit,
            totalQuestions: questions.length
          },
          firstQuestion: questions[0]
        });
      } catch (error) {
        socket.emit('error', { message: 'Error starting game', error: error.message });
      }
    });
    
    // Submit answer
    socket.on('submit-answer', async ({ roomCode, playerId, questionId, answer, timeSpent }) => {
      try {
        const room = await QuizBattleRoom.findOne({ roomCode });
        
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        
        // Find question and check answer
        const question = await Question.findById(questionId);
        const isCorrect = question.correctAnswer === answer;
        
        // Calculate points
        const basePoints = question.points;
        let pointsEarned = 0;
        
        if (isCorrect) {
          // Time factor bonus
          const quiz = await Quiz.findById(room.quiz);
          const maxTime = quiz.timeLimit * 60 / quiz.questions.length; // in seconds per question
          const timeFactor = Math.max(0, 1 - (timeSpent / maxTime));
          pointsEarned = Math.round(basePoints * (0.5 + 0.5 * timeFactor)); // Min 50% of points if correct
        }
        
        // Update player score
        const playerIndex = room.players.findIndex(p => p.id === playerId);
        if (playerIndex !== -1) {
          room.players[playerIndex].score += pointsEarned;
          
          // Add to player's answers
          if (!room.players[playerIndex].answers) {
            room.players[playerIndex].answers = [];
          }
          
          room.players[playerIndex].answers.push({
            question: questionId,
            answer,
            isCorrect,
            points: pointsEarned,
            timeSpent
          });
          
          await room.save();
          
          // Send result to player
          socket.emit('answer-result', {
            questionId,
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            pointsEarned,
            totalScore: room.players[playerIndex].score
          });
          
          // Update all players with new scores
          quizBattle.to(roomCode).emit('score-update', {
            players: room.players.map(p => ({
              id: p.id,
              name: p.name,
              score: p.score
            }))
          });
          
          // Check if all players have answered
          const currentQuestionIndex = room.currentQuestion;
          const allPlayersAnswered = room.players.every(player => 
            player.answers && player.answers.some(a => 
              a.question.toString() === questionId.toString()
            )
          );
          
          if (allPlayersAnswered) {
            // Move to next question
            const questions = await Question.find({ quiz: room.quiz })
              .select('-correctAnswer');
              
            const nextQuestionIndex = currentQuestionIndex + 1;
            
            if (nextQuestionIndex < questions.length) {
              // Send next question
              room.currentQuestion = nextQuestionIndex;
              await room.save();
              
              quizBattle.to(roomCode).emit('next-question', {
                question: questions[nextQuestionIndex],
                questionNumber: nextQuestionIndex + 1,
                totalQuestions: questions.length
              });
            } else {
              // Game completed
              room.status = 'completed';
              room.endTime = new Date();
              await room.save();
              
              // Get final scores and ranks
              const finalScores = room.players
                .map(p => ({ id: p.id, name: p.name, score: p.score }))
                .sort((a, b) => b.score - a.score)
                .map((player, index) => ({
                  ...player,
                  rank: index + 1
                }));
              
              quizBattle.to(roomCode).emit('game-completed', {
                results: finalScores
              });
            }
          }
        }
      } catch (error) {
        socket.emit('error', { message: 'Error submitting answer', error: error.message });
      }
    });
    
    // Request current question (for reconnecting players)
    socket.on('request-current-question', async ({ roomCode, playerId }) => {
      try {
        const room = await QuizBattleRoom.findOne({ roomCode });
        
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        
        if (room.status !== 'active') {
          socket.emit('error', { message: 'Game is not active' });
          return;
        }
        
        const questions = await Question.find({ quiz: room.quiz })
          .select('-correctAnswer');
          
        socket.emit('current-question', {
          question: questions[room.currentQuestion],
          questionNumber: room.currentQuestion + 1,
          totalQuestions: questions.length
        });
      } catch (error) {
        socket.emit('error', { message: 'Error fetching current question', error: error.message });
      }
    });
    
    // Leave room
    socket.on('leave-room', async ({ roomCode, playerId }) => {
      try {
        socket.leave(roomCode);
        
        const room = await QuizBattleRoom.findOne({ roomCode });
        if (room) {
          // Remove player from room
          const playerIndex = room.players.findIndex(p => p.id === playerId);
          if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);
            await room.save();
            
            // If host left, either assign new host or close room
            if (room.host === playerId) {
              if (room.players.length > 0) {
                // Assign new host
                const newHost = room.players[0];
                room.host = newHost.id;
                room.players[0].isHost = true;
                await room.save();
                
                quizBattle.to(roomCode).emit('host-changed', {
                  newHostId: newHost.id,
                  newHostName: newHost.name
                });
              } else {
                // Delete room if empty
                await QuizBattleRoom.deleteOne({ roomCode });
              }
            }
            
            // Notify remaining players
            quizBattle.to(roomCode).emit('player-left', {
              playerId,
              playerCount: room.players.length
            });
          }
        }
      } catch (error) {
        socket.emit('error', { message: 'Error leaving room', error: error.message });
      }
    });
    
    // Disconnect handler
    socket.on('disconnect', () => {
      console.log('Client disconnected from quiz battle:', socket.id);
    });
  });
};