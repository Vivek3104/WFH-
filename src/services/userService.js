import * as userRepo from '../repositories/userRepository.js';
import * as workRepo from '../repositories/workSubmissionRepository.js';
import * as withdrawalRepo from '../repositories/withdrawalRepository.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  const user = await userRepo.createUser(userData);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  const { password, ...userWithoutPassword } = user.toJSON();
  return { user: userWithoutPassword, token };
};

export const loginUser = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  const { password: pwd, ...userWithoutPassword } = user.toJSON();
  return { user: userWithoutPassword, token };
};

export const updateUserProfile = async (userId, updates, file) => {
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('User not found');
  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) user[key] = updates[key];
  });
  if (file) user.profilePic = file.path;
  await user.save();
  return user;
};

export const updateUserBankDetails = async (userId, bankDetails) => {
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('User not found');
  user.bankAccountNumber = bankDetails.accountNumber;
  user.bankIfscCode = bankDetails.ifscCode;
  user.bankAccountHolderName = bankDetails.accountHolderName;
  user.bankName = bankDetails.bankName;
  await user.save();
  return {
    accountNumber: user.bankAccountNumber,
    ifscCode: user.bankIfscCode,
    accountHolderName: user.bankAccountHolderName,
    bankName: user.bankName,
  };
};

export const updateUserGovernmentDoc = async (userId, docData, file) => {
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('User not found');
  user.govtDocType = docData.docType;
  user.govtDocNumber = docData.docNumber;
  if (file) user.govtDocFile = file.path;
  await user.save();
  return {
    docType: user.govtDocType,
    docNumber: user.govtDocNumber,
    docFile: user.govtDocFile,
  };
};

export const submitUserWork = async (userId, taskId, submissionData, files) => {
  return await workRepo.createSubmission({
    taskId,
    userId,
    submissionData,
    submissionFiles: files ? files.map(f => f.path) : [],
  });
};

export const getUserWorkHistory = async (userId) => {
  return await workRepo.findUserSubmissions(userId);
};

export const requestUserWithdrawal = async (userId, amount) => {
  const user = await userRepo.findUserById(userId);
  if (!user) throw new Error('User not found');
  if (amount > user.wallet) {
    throw new Error('Insufficient balance');
  }
  return await withdrawalRepo.createWithdrawal({ userId, amount });
};

export const getUserWithdrawals = async (userId) => {
  return await withdrawalRepo.findUserWithdrawals(userId);
};
