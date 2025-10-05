const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/create', auth, createTask);
router.post('/update/:id', auth, updateTask);

module.exports = router;
