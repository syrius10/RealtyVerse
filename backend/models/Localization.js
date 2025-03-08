const mongoose = require('mongoose');

const LocalizationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  content: {
    type: Map,
    of: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Localization', LocalizationSchema);