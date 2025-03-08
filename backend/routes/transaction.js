const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Create a transaction
router.post('/create', auth, async (req, res) => {
  const { amount, description, serviceFee } = req.body;

  // Define commission rate (e.g., 5%)
  const commissionRate = 0.05;
  const commission = amount * commissionRate;
  const totalAmount = amount + commission + serviceFee;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
      description
    });

    const newTransaction = new Transaction({
      userId: req.user.id,
      amount,
      commission,
      serviceFee,
      totalAmount,
      description
    });

    const transaction = await newTransaction.save();
    res.json({ transaction, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;