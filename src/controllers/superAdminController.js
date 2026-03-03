import * as superAdminService from '../services/superAdminService.js';
import assignmentService from '../services/assignmentService.js';

export const register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const result = await superAdminService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const result = await superAdminService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPendingFranchises = async (req, res) => {
  try {
    const franchises = await superAdminService.getPendingFranchises();
    res.json(franchises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const approveFranchise = async (req, res) => {
  try {
    const { franchiseId, isApproved } = req.body;
    const franchise = await superAdminService.approveFranchise(franchiseId, isApproved);
    res.json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFranchises = async (req, res) => {
  try {
    const franchises = await superAdminService.getAllFranchises();
    res.json(franchises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await superAdminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const toggleAdminStatus = async (req, res) => {
  try {
    const { adminId, isActive } = req.body;
    const admin = await superAdminService.toggleAdminStatus(adminId, isActive);
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const autoAssignTasks = async (req, res) => {
  try {
    const result = await assignmentService.autoAssignTasks();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
