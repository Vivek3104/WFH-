import Franchise from '../models/Franchise.js';

export const createFranchise = async (franchiseData) => {
  return await Franchise.create(franchiseData);
};

export const findPendingFranchises = async () => {
  return await Franchise.find({ isApproved: false }).populate('adminId', 'name email');
};

export const findAllFranchises = async () => {
  return await Franchise.find().populate('adminId', 'name email');
};

export const findFranchiseById = async (id) => {
  return await Franchise.findById(id);
};

export const updateFranchise = async (id, updateData) => {
  return await Franchise.findByIdAndUpdate(id, updateData, { new: true });
};
