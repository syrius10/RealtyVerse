const express = require('express');
const auth = require('../middleware/auth');
const Advertisement = require('../models/Advertisement');
const router = express.Router();

// Get all advertisements
router.get('/', async (req, res) => {
  try {
    const advertisements = await Advertisement.find().sort({ createdAt: -1 });
    res.json(advertisements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new advertisement
router.post('/', auth, async (req, res) => {
  const { title, description, imageUrl, linkUrl, type } = req.body;
  try {
    const newAdvertisement = new Advertisement({
      title,
      description,
      imageUrl,
      linkUrl,
      type
    });

    const advertisement = await newAdvertisement.save();
    res.json(advertisement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;