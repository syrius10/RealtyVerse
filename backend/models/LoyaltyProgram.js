const mongoose = require('mongoose');

const LoyaltyProgramSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  referrals: {
    type: Number,
    default: 0
  },
  premiumMember: {
    type: Boolean,
    default: false
  },
  discounts: [{
    code: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  }]
});

module.exports = mongoose.model('LoyaltyProgram', LoyaltyProgramSchema);