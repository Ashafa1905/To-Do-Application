const Task = require('../models/Task');
const logger = require('../middleware/logger');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.render('tasks', { tasks });
  } catch (err) {
    logger(`Get tasks error: ${err.message}`);
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user._id });
    logger(`Task created: ${title} by user ${req.user.username}`);
    
    // Send the created task as JSON instead of redirect
    res.json(task);
  } catch (err) {
    logger(`Create task error: ${err.message}`);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { status } = req.body;
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = status;
    await task.save();
    logger(`Task updated: ${task.title} -> ${status}`);
    
    // Send updated task as JSON
    res.json(task);
  } catch (err) {
    logger(`Update task error: ${err.message}`);
    res.status(500).json({ error: 'Failed to update task' });
  }
};



