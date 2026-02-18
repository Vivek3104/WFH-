import * as taskService from '../services/taskService.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await taskService.getActiveJobs();
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getActiveTasks();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
