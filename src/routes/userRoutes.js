import express from 'express';
import * as userController from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authUser, userController.getProfile);
router.put('/profile', authUser, upload.single('profilePic'), userController.updateProfile);
router.put('/bank-details', authUser, userController.updateBankDetails);
router.put('/government-doc', authUser, upload.single('docFile'), userController.updateGovernmentDoc);
router.post('/submit-work', authUser, upload.array('files', 5), userController.submitWork);
router.get('/work-history', authUser, userController.getWorkHistory);
router.post('/withdrawal', authUser, userController.requestWithdrawal);
router.get('/withdrawals', authUser, userController.getWithdrawals);

export default router;
