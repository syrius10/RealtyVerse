const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Create a subscription
router.post('/create', auth, async (req, res) => {
  try {
    const { type, plan } = req.body;
    const priceId = plan === 'premium' ? process.env.STRIPE_PREMIUM_PRICE_ID : process.env.STRIPE_BASIC_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/subscription/success`,
      cancel_url: `${process.env.CLIENT_URL}/subscription/cancel`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Handle subscription success
router.post('/success', auth, async (req, res) => {
  try {
    const { type, plan, stripeSubscriptionId } = req.body;

    const subscription = new Subscription({
      userId: req.user.id,
      type,
      plan,
      stripeSubscriptionId,
      endDate: new Date(Date.now() + 30*24*60*60*1000) // 30 days from now
    });

    await subscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;