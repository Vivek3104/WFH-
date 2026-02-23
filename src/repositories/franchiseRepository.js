import { Franchise, Admin } from '../models/index.js';

export const createFranchise = async (franchiseData) => {
  return await Franchise.create(franchiseData);
};

export const findPendingFranchises = async () => {
  return await Franchise.findAll({
    where: { isApproved: false },
    include: [{ model: Admin, as: 'admin', attributes: ['name', 'email'] }],
    order: [['created_at', 'DESC']],
  });
};

export const findAllFranchises = async () => {
  return await Franchise.findAll({
    include: [{ model: Admin, as: 'admin', attributes: ['name', 'email'] }],
    order: [['created_at', 'DESC']],
  });
};

export const findFranchiseById = async (id) => {
  return await Franchise.findByPk(id);
};

export const updateFranchise = async (id, updateData) => {
  await Franchise.update(updateData, { where: { id } });
  return await Franchise.findByPk(id);
};
