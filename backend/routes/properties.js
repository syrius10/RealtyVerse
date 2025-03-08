const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// Get all properties with filters
router.get('/', async (req, res) => {
  const { location, minPrice, maxPrice, propertyType, amenities } = req.query;
  const filters = {};

  if (location) {
    filters.location = { $regex: location, $options: 'i' };
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  if (propertyType) {
    filters.propertyType = propertyType;
  }

  if (amenities) {
    filters.amenities = { $all: amenities.split(',') };
  }

  try {
    const properties = await Property.find(filters);
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add new property
router.post('/', async (req, res) => {
  const { title, description, price, images, location, propertyType, amenities } = req.body;
  try {
    const newProperty = new Property({
      title,
      description,
      price,
      images,
      location,
      propertyType,
      amenities
    });
    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;