import { Job, Admin } from '../models/index.js';

export const createJob = async (jobData) => {
  return await Job.create(jobData);
};

export const findActiveJobs = async () => {
  return await Job.findAll({
    where: { isActive: true },
    include: [{ model: Admin, as: 'admin', attributes: ['name'] }],
    order: [['created_at', 'DESC']],
  });
};

export const findJobById = async (id) => {
  return await Job.findByPk(id);
};
