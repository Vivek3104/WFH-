import Job from '../models/Job.js';

export const createJob = async (jobData) => {
  return await Job.create(jobData);
};

export const findActiveJobs = async () => {
  return await Job.find({ isActive: true }).populate('adminId', 'name');
};

export const findJobById = async (id) => {
  return await Job.findById(id);
};
