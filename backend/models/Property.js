const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  location: {
    type: {
      lat: Number,
      lng: Number,
      address: String
    },
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  modelUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Property', PropertySchema);