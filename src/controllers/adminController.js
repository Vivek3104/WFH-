import * as adminService from '../services/adminService.js';

export const register = async (req, res) => {
  try {
    console.log('Register request:', req.body);
    const result = await adminService.registerAdmin(req.body);
    console.log('Admin created:', result.admin.id);
    res.status(201).json(result);
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await adminService.loginAdmin(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const admin = await adminService.updateAdminProfile(req.admin.id, req.body, req.file);
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCompanyDetails = async (req, res) => {
  try {
    const details = await adminService.updateCompanyDetails(req.admin.id, req.body);
    res.json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const requestFranchiseRegistration = async (req, res) => {
  try {
    const franchise = await adminService.requestFranchise(req.admin.id, req.body);
    res.status(201).json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await adminService.createJob(req.admin.id, req.admin.franchiseId, req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await adminService.createTask(req.admin.id, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPendingWork = async (req, res) => {
  try {
    const submissions = await adminService.getPendingWork();
    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const reviewWork = async (req, res) => {
  try {
    const { submissionId, status, adminNotes } = req.body;
    const submission = await adminService.reviewWork(submissionId, status, req.admin.id, adminNotes);
    res.json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPendingWithdrawals = async (req, res) => {
  try {
    const withdrawals = await adminService.getPendingWithdrawals();
    res.json(withdrawals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const processWithdrawal = async (req, res) => {
  try {
    const { withdrawalId, status, transactionId, adminNotes } = req.body;
    const withdrawal = await adminService.processWithdrawal(
      withdrawalId,
      status,
      req.admin.id,
      transactionId,
      adminNotes
    );
    res.json(withdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWorkHistory = async (req, res) => {
  try {
    const submissions = await adminService.getWorkHistory();
    res.json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
