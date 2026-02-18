import Withdrawal from '../models/Withdrawal.js';

export const createWithdrawal = async (withdrawalData) => {
  return await Withdrawal.create(withdrawalData);
};

export const findPendingWithdrawals = async () => {
  return await Withdrawal.find({ status: 'pending' })
    .populate('userId', 'name email bankDetails')
    .sort('-createdAt');
};

export const findUserWithdrawals = async (userId) => {
  return await Withdrawal.find({ userId }).sort('-createdAt');
};

export const findWithdrawalById = async (id) => {
  return await Withdrawal.findById(id);
};

export const updateWithdrawal = async (id, updateData) => {
  return await Withdrawal.findByIdAndUpdate(id, updateData, { new: true });
};
