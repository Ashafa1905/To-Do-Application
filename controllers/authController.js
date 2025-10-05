const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../middleware/logger');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    logger(`New user registered: ${username}`);
    res.redirect('/login');
  } catch (err) {
    logger(`Register error: ${err.message}`);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    logger(`User logged in: ${username}`);
    res.redirect('/tasks');
  } catch (err) {
    logger(`Login error: ${err.message}`);
    next(err);
  }
};
