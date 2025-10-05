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
    const { title } = req.body;
    await Task.create({ title, userId: req.user._id });
    logger(`Task created: ${title} by user ${req.user.username}`);
    res.redirect('/tasks');
  } catch (err) {
    logger(`Create task error: ${err.message}`);
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { status } = req.body;
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).send('Task not found');

    task.status = status;
    await task.save();
    logger(`Task updated: ${task.title} -> ${status}`);
    res.redirect('/tasks');
  } catch (err) {
    logger(`Update task error: ${err.message}`);
    next(err);
  }
};
