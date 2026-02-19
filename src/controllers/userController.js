import * as userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.params.id, req.body, req.file);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBankDetails = async (req, res) => {
  try {
    const bankDetails = await userService.updateUserBankDetails(req.user._id, req.body);
    res.json(bankDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGovernmentDoc = async (req, res) => {
  try {
    const doc = await userService.updateUserGovernmentDoc(req.user._id, req.body, req.file);
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const submitWork = async (req, res) => {
  try {
    const submission = await userService.submitUserWork(
      req.user._id,
      req.body.taskId,
      req.body.submissionData,
      req.files
    );
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWorkHistory = async (req, res) => {
  try {
    const submissions = await userService.getUserWorkHistory(req.user._id);
    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const requestWithdrawal = async (req, res) => {
  try {
    const withdrawal = await userService.requestUserWithdrawal(req.user._id, req.body.amount);
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await userService.getUserWithdrawals(req.user._id);
    res.json(withdrawals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
