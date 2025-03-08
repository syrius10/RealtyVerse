const express = require('express');
const auth = require('../middleware/auth');
const LoyaltyProgram = require('../models/LoyaltyProgram');
const router = express.Router();

// Get loyalty program details for a user
router.get('/', auth, async (req, res) => {
  try {
    const loyaltyProgram = await LoyaltyProgram.findOne({ userId: req.user.id });
    if (!loyaltyProgram) {
      return res.status(404).json({ msg: 'Loyalty program not found' });
    }
    res.json(loyaltyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add points to a user's loyalty program
router.post('/add-points', auth, async (req, res) => {
  try {
    let loyaltyProgram = await LoyaltyProgram.findOne({ userId: req.user.id });
    if (!loyaltyProgram) {
      loyaltyProgram = new LoyaltyProgram({ userId: req.user.id });
    }

    loyaltyProgram.points += req.body.points;
    await loyaltyProgram.save();
    res.json(loyaltyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a referral to a user's loyalty program
router.post('/add-referral', auth, async (req, res) => {
  try {
    let loyaltyProgram = await LoyaltyProgram.findOne({ userId: req.user.id });
    if (!loyaltyProgram) {
      loyaltyProgram = new LoyaltyProgram({ userId: req.user.id });
    }

    loyaltyProgram.referrals += 1;
    await loyaltyProgram.save();
    res.json(loyaltyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a discount to a user's loyalty program
router.post('/add-discount', auth, async (req, res) => {
  try {
    let loyaltyProgram = await LoyaltyProgram.findOne({ userId: req.user.id });
    if (!loyaltyProgram) {
      loyaltyProgram = new LoyaltyProgram({ userId: req.user.id });
    }

    const discount = {
      code: req.body.code,
      discount: req.body.discount,
      expires: req.body.expires
    };

    loyaltyProgram.discounts.push(discount);
    await loyaltyProgram.save();
    res.json(loyaltyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;