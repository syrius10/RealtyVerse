const express = require('express');
const auth = require('../middleware/auth');
const UserPreferences = require('../models/UserPreferences');
const Recommendations = require('../models/Recommendations');
const Notifications = require('../models/Notifications');
const Property = require('../models/Property');
const router = express.Router();

// Get user preferences
router.get('/preferences', auth, async (req, res) => {
  try {
    const preferences = await UserPreferences.findOne({ userId: req.user.id });
    res.json(preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user preferences
router.post('/preferences', auth, async (req, res) => {
  const { preferredLocations, preferredPropertyTypes, priceRange } = req.body;
  try {
    let preferences = await UserPreferences.findOne({ userId: req.user.id });
    if (preferences) {
      preferences.preferredLocations = preferredLocations;
      preferences.preferredPropertyTypes = preferredPropertyTypes;
      preferences.priceRange = priceRange;
    } else {
      preferences = new UserPreferences({
        userId: req.user.id,
        preferredLocations,
        preferredPropertyTypes,
        priceRange
      });
    }
    await preferences.save();
    res.json(preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get personalized recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    const recommendations = await Recommendations.findOne({ userId: req.user.id }).populate('properties');
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Generate personalized recommendations
router.post('/recommendations', auth, async (req, res) => {
  try {
    const preferences = await UserPreferences.findOne({ userId: req.user.id });
    if (!preferences) {
      return res.status(400).json({ msg: 'User preferences not found' });
    }

    const properties = await Property.find({
      location: { $in: preferences.preferredLocations },
      propertyType: { $in: preferences.preferredPropertyTypes },
      price: { $gte: preferences.priceRange.min, $lte: preferences.priceRange.max }
    });

    let recommendations = await Recommendations.findOne({ userId: req.user.id });
    if (recommendations) {
      recommendations.properties = properties.map(property => property._id);
    } else {
      recommendations = new Recommendations({
        userId: req.user.id,
        properties: properties.map(property => property._id)
      });
    }
    await recommendations.save();
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    const notifications = await Notifications.find({ userId: req.user.id });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Mark notification as read
router.post('/notifications/read', auth, async (req, res) => {
  const { notificationId } = req.body;
  try {
    const notification = await Notifications.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;