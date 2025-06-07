const jwt = require('jsonwebtoken');

function authenticate(role) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const decoded = jwt.verify(token, 'SECRET_KEY');
      if (role && decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authenticate; 