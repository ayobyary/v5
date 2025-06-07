const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', authenticate('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
});

module.exports = router; 