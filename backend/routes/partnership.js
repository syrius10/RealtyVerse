const express = require('express');
const auth = require('../middleware/auth');
const Partnership = require('../models/Partnership');
const router = express.Router();

// Get all partnerships
router.get('/', async (req, res) => {
  try {
    const partnerships = await Partnership.find().sort({ createdAt: -1 });
    res.json(partnerships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new partnership
router.post('/', auth, async (req, res) => {
  const { name, type, description, imageUrl, linkUrl } = req.body;
  try {
    const newPartnership = new Partnership({
      name,
      type,
      description,
      imageUrl,
      linkUrl
    });

    const partnership = await newPartnership.save();
    res.json(partnership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;