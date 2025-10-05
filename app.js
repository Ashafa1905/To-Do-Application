require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

// Home route
app.get('/', (req, res) => res.redirect('/tasks'));

// Global Error Handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
console.log("Yah")
console.log(app)
app.listen(PORT, () => {logger(`Server running on port ${PORT}: http://localhost:${PORT}`), 
console.log (`server is connected to: http://localhost:${PORT}`)})
