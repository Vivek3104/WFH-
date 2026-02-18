import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/register', adminController.register); 
router.post('/login', adminController.login);
router.put('/profile', authAdmin, upload.single('profilePic'), adminController.updateProfile);
router.put('/company-details', authAdmin, adminController.updateCompanyDetails);
router.post('/franchise-request', authAdmin, adminController.requestFranchiseRegistration);
router.post('/job', authAdmin, adminController.createJob);
router.post('/task', authAdmin, adminController.createTask);
router.get('/pending-work', authAdmin, adminController.getPendingWork);
router.post('/review-work', authAdmin, adminController.reviewWork);
router.get('/users', authAdmin, adminController.getUsers);
router.get('/pending-withdrawals', authAdmin, adminController.getPendingWithdrawals);
router.post('/process-withdrawal', authAdmin, adminController.processWithdrawal);
router.get('/work-history', authAdmin, adminController.getWorkHistory);

export default router;
    