import express from 'express';
import * as franchiseController from '../controllers/franchiseController.js';
import { authSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pending-franchises', authSuperAdmin, franchiseController.getPendingFranchises);
router.post('/approve-franchise', authSuperAdmin, franchiseController.approveFranchise);
router.get('/franchises', authSuperAdmin, franchiseController.getAllFranchises);

export default router;
