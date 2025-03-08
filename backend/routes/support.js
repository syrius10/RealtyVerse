const express = require('express');
const auth = require('../middleware/auth');
const SupportTicket = require('../models/SupportTicket');
const FAQ = require('../models/FAQ');
const sendEmail = require('../services/emailService');
const sendSms = require('../services/phoneService');
const getChatResponse = require('../services/chatService');
const router = express.Router();

// Get all support tickets for a user
router.get('/tickets', auth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new support ticket
router.post('/tickets', auth, async (req, res) => {
  const { subject, message } = req.body;
  try {
    const newTicket = new SupportTicket({
      userId: req.user.id,
      subject,
      message
    });

    const ticket = await newTicket.save();
    sendEmail(process.env.SUPPORT_EMAIL, subject, message);
    sendSms(process.env.SUPPORT_PHONE, `New support ticket: ${subject}`);
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all FAQs
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new FAQ
router.post('/faqs', auth, async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFAQ = new FAQ({
      question,
      answer
    });

    const faq = await newFAQ.save();
    res.json(faq);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Handle chat messages
router.post('/chat', auth, async (req, res) => {
  const { message } = req.body;
  try {
    const response = await getChatResponse(message);
    res.json({ response });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;