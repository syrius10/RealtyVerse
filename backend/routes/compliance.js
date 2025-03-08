const express = require('express');
const Compliance = require('../models/Compliance');
const router = express.Router();

// Get compliance information for a specific region
router.get('/:region', async (req, res) => {
  try {
    const compliance = await Compliance.findOne({ region: req.params.region });
    if (!compliance) {
      return res.status(404).json({ msg: 'Compliance information not found' });
    }
    res.json(compliance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create or update compliance information
router.post('/', async (req, res) => {
  const { region, regulations, laws } = req.body;
  try {
    let compliance = await Compliance.findOne({ region });
    if (compliance) {
      compliance.regulations = regulations;
      compliance.laws = laws;
    } else {
      compliance = new Compliance({ region, regulations, laws });
    }
    await compliance.save();
    res.json(compliance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;