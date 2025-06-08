const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role, phone } = req.body;
    
    // بررسی وجود کاربر
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // هش کردن رمز عبور
    const passwordHash = await bcrypt.hash(password, 10);
    
    // ایجاد کاربر جدید
    const newUser = {
      id: Date.now(),
      email,
      passwordHash,
      role: role || 'user',
      phone: phone || ''
    };
    
    users.push(newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // پیدا کردن کاربر
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // بررسی رمز عبور
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // ایجاد توکن
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    console.log('Login response:', {
      token,
      role: user.role,
      email: user.email
    });

    res.json({
      token,
      role: user.role,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 