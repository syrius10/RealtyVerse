const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Blockchain = require('../blockchain');

const router = express.Router();
const transactionBlockchain = new Blockchain();

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Complete a payment
router.post('/complete-payment', async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    // Record transaction on blockchain
    const newTransaction = {
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      payment_method: paymentIntent.payment_method,
      description: paymentIntent.description,
      timestamp: new Date().toISOString(),
    };
    transactionBlockchain.addBlock(new Block(transactionBlockchain.chain.length, newTransaction.timestamp, newTransaction));

    res.json({ success: true, paymentIntent, blockchain: transactionBlockchain.chain });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;