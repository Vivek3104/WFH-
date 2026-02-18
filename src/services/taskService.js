import * as jobRepo from '../repositories/jobRepository.js';
import * as taskRepo from '../repositories/taskRepository.js';

export const getActiveJobs = async () => {
  return await jobRepo.findActiveJobs();
};

export const getActiveTasks = async () => {
  return await taskRepo.findActiveTasks();
};

export const getTaskById = async (id) => {
  return await taskRepo.findTaskById(id);
};
