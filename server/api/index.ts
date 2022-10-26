import express from 'express';

const router = express.Router();

router.get('/socket', (req, res) => {
  const socket = req.app.get('io');
  socket.emit('hello');
  res.json('ohoh');
});

export default router;
