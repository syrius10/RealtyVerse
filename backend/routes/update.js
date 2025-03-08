const express = require('express');
const auth = require('../middleware/auth');
const Update = require('../models/Update');
const router = express.Router();

// Get all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().sort({ releaseDate: -1 });
    res.json(updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new update
router.post('/', auth, async (req, res) => {
  const { title, description, version, features } = req.body;

  try {
    const newUpdate = new Update({
      title,
      description,
      version,
      features
    });

    const savedUpdate = await newUpdate.save();
    res.json(savedUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;