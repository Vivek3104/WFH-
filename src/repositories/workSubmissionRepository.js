import WorkSubmission from '../models/WorkSubmission.js';

export const createSubmission = async (submissionData) => {
  return await WorkSubmission.create(submissionData);
};

export const findPendingSubmissions = async () => {
  return await WorkSubmission.find({ status: 'pending' })
    .populate('userId', 'name email')
    .populate('taskId')
    .sort('-createdAt');
};

export const findSubmissionById = async (id) => {
  return await WorkSubmission.findById(id).populate('taskId');
};

export const findUserSubmissions = async (userId) => {
  return await WorkSubmission.find({ userId })
    .populate('taskId')
    .sort('-createdAt');
};

export const findAllSubmissions = async () => {
  return await WorkSubmission.find()
    .populate('userId', 'name email')
    .populate('taskId')
    .sort('-createdAt');
};

export const updateSubmission = async (id, updateData) => {
  return await WorkSubmission.findByIdAndUpdate(id, updateData, { new: true });
};
