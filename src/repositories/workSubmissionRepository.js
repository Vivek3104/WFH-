import { WorkSubmission, User, Task } from '../models/index.js';

export const createSubmission = async (submissionData) => {
  return await WorkSubmission.create(submissionData);
};

export const findPendingSubmissions = async () => {
  return await WorkSubmission.findAll({
    where: { status: 'pending' },
    include: [
      { model: User, as: 'user', attributes: ['name', 'email'] },
      { model: Task, as: 'task' },
    ],
    order: [['created_at', 'DESC']],
  });
};

export const findSubmissionById = async (id) => {
  return await WorkSubmission.findByPk(id, {
    include: [{ model: Task, as: 'task' }],
  });
};

export const findUserSubmissions = async (userId) => {
  return await WorkSubmission.findAll({
    where: { userId },
    include: [{ model: Task, as: 'task' }],
    order: [['created_at', 'DESC']],
  });
};

export const findAllSubmissions = async () => {
  return await WorkSubmission.findAll({
    include: [
      { model: User, as: 'user', attributes: ['name', 'email'] },
      { model: Task, as: 'task' },
    ],
    order: [['created_at', 'DESC']],
  });
};

export const updateSubmission = async (id, updateData) => {
  await WorkSubmission.update(updateData, { where: { id } });
  return await WorkSubmission.findByPk(id, {
    include: [{ model: Task, as: 'task' }],
  });
};
