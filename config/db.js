const mongoose = require('mongoose');
const logger = require('../middleware/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
