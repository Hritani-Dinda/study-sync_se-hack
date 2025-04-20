const express = require('express');
const router = express.Router();

// Simple route handlers for now
router.get('/', (req, res) => {
  res.json({ message: 'List of quizzes' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Quiz details' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Quiz created' });
});

module.exports = router; 