import * as franchiseRepo from '../repositories/franchiseRepository.js';
import * as adminRepo from '../repositories/adminRepository.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const register = async (data) => {
  const { email, password, name, phone } = data;
  
  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required');
  }
  
  const existingAdmin = await Admin.findOne({ where: { email } });
  if (existingAdmin) throw new Error('Super admin already exists');
  
  const admin = await Admin.create({ email, password, name, phone, role: 'superadmin', isApproved: true });
  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
  return { token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } };
};

export const login = async (data) => {
  const { email, password } = data;
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const admin = await Admin.findOne({ where: { email, role: 'superadmin' } });
  if (!admin) throw new Error('Invalid credentials');
  
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');
  
  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
  return { token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } };
};

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
