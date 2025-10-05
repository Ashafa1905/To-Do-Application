const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
