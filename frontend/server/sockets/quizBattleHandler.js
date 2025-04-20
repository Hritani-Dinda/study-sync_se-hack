module.exports = (io) => {
  // Store active rooms
  const activeRooms = new Map();

  // Sample questions for testing
  const sampleQuestions = [
    {
      id: 1,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      id: 2,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      id: 4,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1
    },
    {
      id: 5,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2
    }
  ];

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    let currentRoom = null;

    // Join room
    socket.on('joinRoom', ({ roomId, username }) => {
      console.log(`User ${username} (${socket.id}) joining room ${roomId}`);
      
      // Leave any previous rooms
      if (currentRoom) {
        socket.leave(currentRoom);
        const oldRoom = activeRooms.get(currentRoom);
        if (oldRoom) {
          const playerIndex = oldRoom.participants.findIndex(p => p.id === socket.id);
          if (playerIndex !== -1) {
            oldRoom.participants.splice(playerIndex, 1);
            if (oldRoom.participants.length === 0) {
              activeRooms.delete(currentRoom);
            } else if (oldRoom.host === socket.id) {
              oldRoom.host = oldRoom.participants[0].id;
              io.to(currentRoom).emit('userLeft', {
                participants: oldRoom.participants,
                host: oldRoom.host
              });
            }
          }
        }
      }
      
      // Join new room
      socket.join(roomId);
      currentRoom = roomId;
      
      // Initialize room if it doesn't exist
      if (!activeRooms.has(roomId)) {
        console.log(`Creating new room: ${roomId}`);
        activeRooms.set(roomId, {
          participants: [],
          isActive: false,
          questions: sampleQuestions,
          currentQuestion: 0,
          host: socket.id // Set first player as host
        });
      }

      const room = activeRooms.get(roomId);
      
      // Add player if not already in room
      const existingPlayer = room.participants.find(p => p.id === socket.id);
      if (!existingPlayer) {
        console.log(`Adding player ${username} to room ${roomId}`);
        room.participants.push({
          id: socket.id,
          username,
          score: 0,
          hasAnswered: false
        });
      }

      console.log(`Room ${roomId} now has ${room.participants.length} players`);

      // Notify all clients in the room
      io.to(roomId).emit('userJoined', {
        participants: room.participants,
        host: room.host
      });
      
      // If game is already active, send current question to the new player
      if (room.isActive) {
        console.log(`Game is already active, sending current question to new player ${socket.id}`);
        const currentQuestion = {
          ...room.questions[room.currentQuestion],
          correct: undefined
        };
        
        socket.emit('gameStart', currentQuestion);
      }
    });

    // Start quiz
    socket.on('startGame', ({ roomId, questions }) => {
      console.log(`Received startGame request for room ${roomId} from ${socket.id}`);
      
      // Validate room ID
      if (!roomId || typeof roomId !== 'string') {
        console.log(`Invalid room ID: ${roomId}`);
        socket.emit('error', { message: 'Invalid room ID' });
        return;
      }
      
      const room = activeRooms.get(roomId);
      
      // Check if room exists
      if (!room) {
        console.log(`Room ${roomId} not found`);
        socket.emit('error', { message: 'Room not found' });
        return;
      }
      
      // Check if game is already active
      if (room.isActive) {
        console.log(`Game in room ${roomId} is already active`);
        
        // If game is already active, just send the current question to this player
        if (room.currentQuestion < room.questions.length) {
          const currentQuestion = {
            ...room.questions[room.currentQuestion],
            correct: undefined
          };
          
          console.log(`Game already active, sending current question to player ${socket.id}`);
          socket.emit('gameStart', currentQuestion);
        }
        return;
      }
      
      // Check if user is the host
      if (socket.id !== room.host) {
        console.log(`User ${socket.id} is not the host of room ${roomId}`);
        socket.emit('error', { message: 'You must be the host to start the game' });
        return;
      }
      
      console.log(`Starting game in room ${roomId}`);
      
      // Set game as active
      room.isActive = true;
      room.currentQuestion = 0;
      room.participants.forEach(p => p.hasAnswered = false);
      
      // Use provided questions if available, otherwise use default sample questions
      if (questions && questions.length > 0) {
        console.log(`Using ${questions.length} questions provided by client`);
        room.questions = questions;
      } else {
        console.log(`Using default ${room.questions.length} sample questions`);
      }
      
      // Send first question to all participants
      const firstQuestion = {
        ...room.questions[0],
        correct: undefined // Don't send correct answer to clients
      };
      
      console.log(`Sending first question to all participants:`, firstQuestion);
      io.to(roomId).emit('gameStart', firstQuestion);
      
      console.log(`Game started in room ${roomId} with ${room.participants.length} players`);
    });

    // Handle answer submission
    socket.on('submitAnswer', ({ roomId, answer }) => {
      console.log(`Answer submitted in room ${roomId}: ${answer}`);
      const room = activeRooms.get(roomId);
      if (room && room.isActive) {
        const participant = room.participants.find(p => p.id === socket.id);
        if (participant && !participant.hasAnswered) {
          const currentQuestion = room.questions[room.currentQuestion];
          // -1 means no answer was selected (time ran out)
          const isCorrect = answer !== -1 && answer === currentQuestion.correct;
          
          // Update score - only award points for correct answers
          participant.score += isCorrect ? 10 : 0;
          participant.hasAnswered = true;
          
          console.log(`Player ${participant.username} answered ${isCorrect ? 'correctly' : 'incorrectly'}. Score: ${participant.score}`);
          
          // Send updated scores to all participants
          io.to(roomId).emit('updateScores', 
            Object.fromEntries(room.participants.map(p => [p.id, p.score]))
          );

          // Check if all players have answered
          const allAnswered = room.participants.every(p => p.hasAnswered);
          console.log(`All players answered: ${allAnswered}`);
          
          if (allAnswered) {
            // Show correct answer to all players
            io.to(roomId).emit('showCorrectAnswer', currentQuestion.correct);
            
            // Wait a moment before moving to the next question
            setTimeout(() => {
              // Reset hasAnswered for next question
              room.participants.forEach(p => p.hasAnswered = false);
              
              // Move to next question or end game
              room.currentQuestion++;
              console.log(`Moving to question ${room.currentQuestion + 1} of ${room.questions.length}`);
              
              if (room.currentQuestion < room.questions.length) {
                // Send next question
                const nextQuestion = {
                  ...room.questions[room.currentQuestion],
                  correct: undefined
                };
                
                console.log(`Sending next question to all participants:`, nextQuestion);
                io.to(roomId).emit('nextQuestion', {
                  question: nextQuestion,
                  questionNumber: room.currentQuestion + 1,
                  totalQuestions: room.questions.length
                });
              } else {
                // Game completed
                console.log(`Game completed in room ${roomId}`);
                room.isActive = false;
                io.to(roomId).emit('gameEnd', 
                  Object.fromEntries(room.participants.map(p => [p.id, p.score]))
                );
              }
            }, 3000); // Wait 3 seconds before moving to the next question
          }
        } else {
          console.log(`Player ${socket.id} already answered or not found in room ${roomId}`);
        }
      } else {
        console.log(`Room ${roomId} not found or game not active`);
      }
    });

    // Disconnect handling
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      if (currentRoom) {
        const room = activeRooms.get(currentRoom);
        if (room) {
          const playerIndex = room.participants.findIndex(p => p.id === socket.id);
          if (playerIndex !== -1) {
            room.participants.splice(playerIndex, 1);
            console.log(`Player removed from room ${currentRoom}. ${room.participants.length} players remaining`);
            
            // If room is empty, delete it
            if (room.participants.length === 0) {
              activeRooms.delete(currentRoom);
              console.log(`Room ${currentRoom} deleted - no players remaining`);
            } else {
              // If host left, assign new host
              if (socket.id === room.host) {
                room.host = room.participants[0].id;
              }
              // Notify remaining players
              io.to(currentRoom).emit('userLeft', {
                participants: room.participants,
                host: room.host
              });
            }
          }
        }
      }
    });
  });
}; 