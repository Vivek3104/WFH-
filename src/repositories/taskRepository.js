import { Task, Job } from '../models/index.js';

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const findActiveTasks = async () => {
  return await Task.findAll({
    where: { isActive: true },
    include: [{ model: Job, as: 'job' }],
    order: [['created_at', 'DESC']],
  });
};

export const findTaskById = async (id) => {
  return await Task.findByPk(id, {
    include: [{ model: Job, as: 'job' }],
  });
};
