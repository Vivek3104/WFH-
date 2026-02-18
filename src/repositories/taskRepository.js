import Task from '../models/Task.js';

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const findActiveTasks = async () => {
  return await Task.find({ isActive: true }).populate('jobId');
};

export const findTaskById = async (id) => {
  return await Task.findById(id).populate('jobId');
};
