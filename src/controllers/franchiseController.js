import * as franchiseService from '../services/franchiseService.js';

export const getPendingFranchises = async (req, res) => {
  try {
    const franchises = await franchiseService.getPendingFranchises();
    res.json(franchises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const approveFranchise = async (req, res) => {
  try {
    const { franchiseId, isApproved } = req.body;
    const franchise = await franchiseService.approveFranchise(franchiseId, isApproved);
    res.json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFranchises = async (req, res) => {
  try {
    const franchises = await franchiseService.getAllFranchises();
    res.json(franchises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
