const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new event
router.post('/events', auth, async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      createdBy: req.user.id
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;