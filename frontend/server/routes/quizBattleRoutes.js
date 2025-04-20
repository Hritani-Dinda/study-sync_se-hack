const express = require('express');
const router = express.Router();

// Simple route handlers for now
router.post('/rooms/create', (req, res) => {
  res.json({ message: 'Room created' });
});

router.post('/rooms/join', (req, res) => {
  res.json({ message: 'Joined room' });
});

router.get('/rooms/:roomId', (req, res) => {
  res.json({ message: 'Room details' });
});

router.post('/rooms/:roomId/start', (req, res) => {
  res.json({ message: 'Battle started' });
});

module.exports = router; 