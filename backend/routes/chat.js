const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

const router = express.Router();

// Get all chat messages between two users
router.get('/:userId', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort({ date: -1 });

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Send a new chat message
router.post(
  '/',
  [
    auth,
    [
      check('receiver', 'Receiver is required').not().isEmpty(),
      check('message', 'Message is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { receiver, message } = req.body;

    try {
      const newChat = new Chat({
        sender: req.user.id,
        receiver,
        message
      });

      const chat = await newChat.save();

      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;