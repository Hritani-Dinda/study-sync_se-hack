// File: server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './.env' });

// Route files
const quizRoutes = require('./routes/quizRoutes');
const quizBattleRoutes = require('./routes/quizBattleRoutes');
const authRoutes = require('./routes/authRoutes');

// Connect to database
const db = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-battle', quizBattleRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Campus LMS API is running');
});

// Socket.io for real-time quiz battles
const quizBattleHandler = require('./sockets/quizBattleHandler');
quizBattleHandler(io);

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});