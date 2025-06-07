const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', authenticate('user'), (req, res) => {
  res.json({ message: 'User dashboard', user: req.user });
});

module.exports = router; 