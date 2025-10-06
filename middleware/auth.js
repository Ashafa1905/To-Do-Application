const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use same secret
    req.user = await User.findById(decoded.id); // attach user object
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
