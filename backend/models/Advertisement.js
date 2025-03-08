const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  linkUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['service', 'sponsored'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);