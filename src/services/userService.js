import * as userRepo from '../repositories/userRepository.js';
import * as workRepo from '../repositories/workSubmissionRepository.js';
import * as withdrawalRepo from '../repositories/withdrawalRepository.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  const user = await userRepo.createUser(userData);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token };
};

export const loginUser = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pwd, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token };
};

export const updateUserProfile = async (userId, updates, file) => {
  const user = await userRepo.findUserById(userId);
  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) user[key] = updates[key];
  });
  if (file) user.profilePic = file.path;
  await user.save();
  return user;
};

export const updateUserBankDetails = async (userId, bankDetails) => {
  const user = await userRepo.findUserById(userId);
  user.bankDetails = bankDetails;
  await user.save();
  return user.bankDetails;
};

export const updateUserGovernmentDoc = async (userId, docData, file) => {
  const user = await userRepo.findUserById(userId);
  user.governmentDoc = {
    docType: docData.docType,
    docNumber: docData.docNumber,
    docFile: file ? file.path : user.governmentDoc.docFile
  };
  await user.save();
  return user.governmentDoc;
};

export const submitUserWork = async (userId, taskId, submissionData, files) => {
  return await workRepo.createSubmission({
    taskId,
    userId,
    submissionData,
    submissionFiles: files ? files.map(f => f.path) : []
  });
};

export const getUserWorkHistory = async (userId) => {
  return await workRepo.findUserSubmissions(userId);
};

export const requestUserWithdrawal = async (userId, amount) => {
  const user = await userRepo.findUserById(userId);
  if (amount > user.wallet) {
    throw new Error('Insufficient balance');
  }
  return await withdrawalRepo.createWithdrawal({ userId, amount });
};

export const getUserWithdrawals = async (userId) => {
  return await withdrawalRepo.findUserWithdrawals(userId);
};
