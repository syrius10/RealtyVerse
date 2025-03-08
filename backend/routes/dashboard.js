const express = require('express');
const auth = require('../middleware/auth');
const Property = require('../models/Property');
const Review = require('../models/Review');

const router = express.Router();

// Get dashboard data for a property owner
router.get('/', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    const propertyIds = properties.map(property => property._id);

    const reviews = await Review.find({ property: { $in: propertyIds } });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;

    res.json({
      properties,
      totalReviews,
      averageRating,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;