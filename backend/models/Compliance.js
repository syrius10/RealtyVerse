const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
  },
  regulations: {
    type: String,
    required: true
  },
  laws: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Compliance', ComplianceSchema);