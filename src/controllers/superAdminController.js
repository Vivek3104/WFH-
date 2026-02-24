import * as superAdminService from '../services/superAdminService.js';

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
