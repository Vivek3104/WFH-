import * as adminRepo from '../repositories/adminRepository.js';
import * as franchiseRepo from '../repositories/franchiseRepository.js';
import * as jobRepo from '../repositories/jobRepository.js';
import * as taskRepo from '../repositories/taskRepository.js';
import * as workRepo from '../repositories/workSubmissionRepository.js';
import * as withdrawalRepo from '../repositories/withdrawalRepository.js';
import * as userRepo from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (adminData) => {
  const admin = await adminRepo.createAdmin(adminData);
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
  const { password, ...adminWithoutPassword } = admin.toJSON();
  return { admin: adminWithoutPassword, token };
};

export const loginAdmin = async (email, password) => {
  const admin = await adminRepo.findAdminByEmail(email);
  if (!admin || !(await admin.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
  const { password: pwd, ...adminWithoutPassword } = admin.toJSON();
  return { admin: adminWithoutPassword, token };
};

export const updateAdminProfile = async (adminId, updates, file) => {
  const admin = await adminRepo.findAdminById(adminId);
  if (!admin) throw new Error('Admin not found');
  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) admin[key] = updates[key];
  });
  if (file) admin.profilePic = file.path;
  await admin.save();
  return admin;
};

export const updateCompanyDetails = async (adminId, companyDetails) => {
  const admin = await adminRepo.findAdminById(adminId);
  if (!admin) throw new Error('Admin not found');
  admin.companyName = companyDetails.companyName;
  admin.registrationNumber = companyDetails.registrationNumber;
  admin.address = companyDetails.address;
  admin.gstNumber = companyDetails.gstNumber;
  await admin.save();
  return {
    companyName: admin.companyName,
    registrationNumber: admin.registrationNumber,
    address: admin.address,
    gstNumber: admin.gstNumber,
  };
};

export const requestFranchise = async (adminId, franchiseData) => {
  const franchise = await franchiseRepo.createFranchise({ ...franchiseData, adminId });
  const admin = await adminRepo.findAdminById(adminId);
  if (!admin) throw new Error('Admin not found');
  admin.franchiseId = franchise.id;
  await admin.save();
  return franchise;
};

export const createJob = async (adminId, franchiseId, jobData) => {
  return await jobRepo.createJob({ ...jobData, adminId, franchiseId });
};

export const createTask = async (adminId, taskData) => {
  return await taskRepo.createTask({ ...taskData, adminId });
};

export const getPendingWork = async () => {
  return await workRepo.findPendingSubmissions();
};

export const reviewWork = async (submissionId, status, adminId, adminNotes) => {
  const submission = await workRepo.findSubmissionById(submissionId);
  if (!submission) throw new Error('Submission not found');
  if (!submission.task) throw new Error('Task not found for this submission');

  submission.status = status;
  submission.adminNotes = adminNotes;
  submission.reviewedBy = adminId;
  submission.reviewedAt = new Date();
  await submission.save();

  if (status === 'approved') {
    const user = await userRepo.findUserById(submission.userId);
    if (user) {
      user.wallet += submission.task.payoutAmount;
      await user.save();
    }
  }

  return submission;
};

export const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

export const getPendingWithdrawals = async () => {
  return await withdrawalRepo.findPendingWithdrawals();
};

export const processWithdrawal = async (withdrawalId, status, adminId, transactionId, adminNotes) => {
  const withdrawal = await withdrawalRepo.findWithdrawalById(withdrawalId);
  if (!withdrawal) throw new Error('Withdrawal not found');

  withdrawal.status = status;
  withdrawal.transactionId = transactionId;
  withdrawal.adminNotes = adminNotes;
  withdrawal.adminId = adminId;
  withdrawal.processedAt = new Date();
  await withdrawal.save();

  if (status === 'approved') {
    const user = await userRepo.findUserById(withdrawal.userId);
    if (user) {
      user.wallet -= withdrawal.amount;
      await user.save();
    }
  }

  return withdrawal;
};

export const getWorkHistory = async () => {
  return await workRepo.findAllSubmissions();
};
