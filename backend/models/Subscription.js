const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['buyer', 'seller', 'agent'],
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'premium'],
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  stripeSubscriptionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);