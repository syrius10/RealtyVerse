const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  features: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Update', UpdateSchema);