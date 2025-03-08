const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

// Example route to get Nest thermostat data
router.get('/nest/thermostat', auth, async (req, res) => {
  try {
    const response = await axios.get('https://developer-api.nest.com/devices/thermostats', {
      headers: {
        'Authorization': `Bearer ${process.env.NEST_ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Example route to get Ring camera data
router.get('/ring/camera', auth, async (req, res) => {
  try {
    const response = await axios.get('https://api.ring.com/clients_api/rings', {
      headers: {
        'Authorization': `Bearer ${process.env.RING_ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;