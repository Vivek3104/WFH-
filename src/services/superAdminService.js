import * as franchiseRepo from '../repositories/franchiseRepository.js';
import * as adminRepo from '../repositories/adminRepository.js';

export const getPendingFranchises = async () => {
  return await franchiseRepo.findPendingFranchises();
};

export const approveFranchise = async (franchiseId, isApproved) => {
  const franchise = await franchiseRepo.findFranchiseById(franchiseId);
  if (!franchise) throw new Error('Franchise not found');
  
  franchise.isApproved = isApproved;
  await franchise.save();
  
  if (isApproved) {
    await adminRepo.updateAdmin(franchise.adminId, { isApproved: true });
  }
  
  return franchise;
};

export const getAllFranchises = async () => {
  return await franchiseRepo.findAllFranchises();
};

export const getAllAdmins = async () => {
  return await adminRepo.findAllAdmins();
};

export const toggleAdminStatus = async (adminId, isActive) => {
  const admin = await adminRepo.findAdminById(adminId);
  if (!admin) throw new Error('Admin not found');
  if (admin.role === 'superadmin') throw new Error('Cannot modify super admin status');
  
  admin.isActive = isActive;
  await admin.save();
  return admin;
};
