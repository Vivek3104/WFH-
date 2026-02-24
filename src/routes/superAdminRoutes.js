import express from 'express';
import * as superAdminController from '../controllers/superAdminController.js';
import { authSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pending-franchises', authSuperAdmin, superAdminController.getPendingFranchises);
router.post('/approve-franchise', authSuperAdmin, superAdminController.approveFranchise);
router.get('/franchises', authSuperAdmin, superAdminController.getAllFranchises);
router.get('/admins', authSuperAdmin, superAdminController.getAllAdmins);
router.post('/toggle-admin-status', authSuperAdmin, superAdminController.toggleAdminStatus);

export default router;
