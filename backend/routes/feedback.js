const express = require('express');
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Get all feedback
router.get('/', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Submit feedback
router.post('/', auth, async (req, res) => {
  const { feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      userId: req.user.id,
      feedback
    });

    const savedFeedback = await newFeedback.save();
    res.json(savedFeedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;