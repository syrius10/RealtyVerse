const mongoose = require('mongoose');

const PartnershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['real_estate_agency', 'mortgage_lender', 'home_service_provider', 'affiliate_marketing'],
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Partnership', PartnershipSchema);