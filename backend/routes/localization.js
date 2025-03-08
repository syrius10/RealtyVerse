const express = require('express');
const Localization = require('../models/Localization');
const router = express.Router();

// Get localization content for a specific language
router.get('/:language', async (req, res) => {
  try {
    const localization = await Localization.findOne({ language: req.params.language });
    if (!localization) {
      return res.status(404).json({ msg: 'Localization not found' });
    }
    res.json(localization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create or update localization content
router.post('/', async (req, res) => {
  const { language, content } = req.body;
  try {
    let localization = await Localization.findOne({ language });
    if (localization) {
      localization.content = content;
    } else {
      localization = new Localization({ language, content });
    }
    await localization.save();
    res.json(localization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;