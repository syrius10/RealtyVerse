require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Blockchain = require('./blockchain');
require('./passport');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error(err);
});

// Initialize blockchain
const transactionBlockchain = new Blockchain();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/smart-home', require('./routes/smartHome'));
app.use('/api/virtual-staging', require('./routes/virtualStaging'));
app.use('/api/loyalty-program', require('./routes/loyaltyProgram'));
app.use('/api/subscription', require('./routes/subscription'));
app.use('/api/advertisement', require('./routes/advertisement'));
app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/partnership', require('./routes/partnership'));
app.use('/api/localization', require('./routes/localization'));
app.use('/api/compliance', require('./routes/compliance'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/update', require('./routes/update'));
app.use('/api/personalization', require('./routes/personalization'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/event', require('./routes/event'));
app.use('/api/support', require('./routes/support'));

// Socket.io setup for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});