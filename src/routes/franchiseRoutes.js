import express from 'express';
import * as franchiseController from '../controllers/franchiseController.js';
import { authAnyAdmin, authFranchise } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register-company', authAnyAdmin, franchiseController.registerCompany);
router.post('/add-user', authFranchise, franchiseController.addUser);
router.get('/stats', authFranchise, franchiseController.getFranchiseStats);

export default router;
