const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');

// @route    POST api/submissions
// @desc     Submit contact/application form
// @access   Private (Requires Auth)
router.post('/', auth, async (req, res) => {
  const { name, email, message } = req.body;

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields (Name, Email, Message) are required' });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  // Simple Email Validation Regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please include a valid email address' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters long' });
  }

  try {
    const newSubmission = new Submission({
      name,
      email,
      message
    });

    await newSubmission.save();

    res.status(201).json({
      success: true,
      message: 'Form Submitted Successfully',
      submission: newSubmission
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
