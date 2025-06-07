const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), email, passwordHash, role });
  res.json({ message: 'Registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: 'Invalid password' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'SECRET_KEY', { expiresIn: '1d' });
  res.json({ token, role: user.role });
});

module.exports = router; 