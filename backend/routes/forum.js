const express = require('express');
const auth = require('../middleware/auth');
const Forum = require('../models/Forum');
const Discussion = require('../models/Discussion');
const router = express.Router();

// Get all forums
router.get('/forums', async (req, res) => {
  try {
    const forums = await Forum.find().sort({ createdAt: -1 });
    res.json(forums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new forum
router.post('/forums', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newForum = new Forum({
      title,
      description,
      createdBy: req.user.id
    });

    const forum = await newForum.save();
    res.json(forum);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all discussions in a forum
router.get('/forums/:forumId/discussions', async (req, res) => {
  try {
    const discussions = await Discussion.find({ forumId: req.params.forumId }).sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new discussion in a forum
router.post('/forums/:forumId/discussions', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newDiscussion = new Discussion({
      forumId: req.params.forumId,
      title,
      content,
      createdBy: req.user.id
    });

    const discussion = await newDiscussion.save();
    res.json(discussion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;