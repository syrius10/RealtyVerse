const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Property = require('../models/Property');
const User = require('../models/User');

const router = express.Router();

// Get all reviews for a property
router.get('/property/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.id }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all reviews for an agent
router.get('/agent/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ agent: req.params.id }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new review
router.post(
  '/',
  [
    auth,
    [
      check('property', 'Property is required').not().isEmpty(),
      check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
      check('comment', 'Comment is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { property, agent, rating, comment } = req.body;

    try {
      const newReview = new Review({
        user: req.user.id,
        property,
        agent,
        rating,
        comment
      });

      const review = await newReview.save();

      // Verify purchase if the user has completed a transaction for this property
      const propertyData = await Property.findById(property);
      if (propertyData && propertyData.owner.equals(req.user.id)) {
        review.verified = true;
        await review.save();
      }

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;