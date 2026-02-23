import { Withdrawal, User } from '../models/index.js';

export const createWithdrawal = async (withdrawalData) => {
  return await Withdrawal.create(withdrawalData);
};

export const findPendingWithdrawals = async () => {
  return await Withdrawal.findAll({
    where: { status: 'pending' },
    include: [{
      model: User,
      as: 'user',
      attributes: ['name', 'email', 'bankAccountNumber', 'bankIfscCode', 'bankAccountHolderName', 'bankName'],
    }],
    order: [['created_at', 'DESC']],
  });
};

export const findUserWithdrawals = async (userId) => {
  return await Withdrawal.findAll({
    where: { userId },
    order: [['created_at', 'DESC']],
  });
};

export const findWithdrawalById = async (id) => {
  return await Withdrawal.findByPk(id);
};

export const updateWithdrawal = async (id, updateData) => {
  await Withdrawal.update(updateData, { where: { id } });
  return await Withdrawal.findByPk(id);
};
