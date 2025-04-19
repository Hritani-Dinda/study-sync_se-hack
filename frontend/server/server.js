const { Server } = require("socket.io")
const express = require("express")
const http = require("http")
const cors = require("cors")

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Add a proper question bank
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    id: 2,
    question: "Which programming language is React built with?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correct: 1,
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "High Transfer Machine Language",
    ],
    correct: 0,
  },
  {
    id: 4,
    question: "Which of these is a CSS preprocessor?",
    options: ["SASS", "Java", "Python", "Ruby"],
    correct: 0,
  },
  {
    id: 5,
    question: "What is the primary purpose of SQL?",
    options: ["Styling web pages", "Database management", "Server configuration", "Network security"],
    correct: 1,
  },
]

const rooms = new Map()
const currentQuestionIndex = 0

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId)

    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        players: [],
        currentQuestion: null,
        scores: {},
        questionIndex: 0,
      })
    }

    const room = rooms.get(roomId)
    const playerName = `Player ${room.players.length + 1}`
    room.players.push({
      id: socket.id,
      name: playerName,
      score: 0,
    })

    io.to(roomId).emit("playerJoined", room.players)
    console.log(`${playerName} joined room ${roomId}`)
  })

  socket.on("startGame", (roomId) => {
    const room = rooms.get(roomId)
    if (room && room.players[0].id === socket.id) {
      room.questionIndex = 0
      const question = quizQuestions[room.questionIndex]
      room.currentQuestion = question
      io.to(roomId).emit("gameStart", question)
      console.log(`Game started in room ${roomId}`)
    }
  })

  socket.on("submitAnswer", ({ room: roomId, answer }) => {
    const room = rooms.get(roomId)
    if (room && room.currentQuestion) {
      const player = room.players.find((p) => p.id === socket.id)
      if (player) {
        if (answer === room.currentQuestion.correct) {
          player.score += 10
        }
        room.scores[socket.id] = player.score

        const allAnswered = room.players.every((p) => p.id in room.scores)
        if (allAnswered) {
          io.to(roomId).emit("updateScores", room.scores)

          room.questionIndex++
          if (room.questionIndex < quizQuestions.length) {
            const nextQuestion = quizQuestions[room.questionIndex]
            room.currentQuestion = nextQuestion
            room.scores = {}
            // Add a delay before next question
            setTimeout(() => {
              io.to(roomId).emit("gameStart", nextQuestion)
            }, 2000) // 2-second delay
          } else {
            io.to(roomId).emit("gameEnd", room.scores)
          }
        }
      }
    }
  })

  socket.on("disconnect", () => {
    rooms.forEach((room, roomId) => {
      const playerIndex = room.players.findIndex((p) => p.id === socket.id)
      if (playerIndex !== -1) {
        const playerName = room.players[playerIndex].name
        room.players.splice(playerIndex, 1)
        delete room.scores[socket.id]

        if (room.players.length === 0) {
          rooms.delete(roomId)
        } else {
          io.to(roomId).emit("playerJoined", room.players)
        }
        console.log(`${playerName} left room ${roomId}`)
      }
    })
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
