import express from 'express';
import * as subscriptionController from '../controllers/subscriptionController.js';
import { authUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/plans', authUser, subscriptionController.getPlans);
router.post('/buy', authUser, subscriptionController.buyPlan);
router.get('/my-subscription', authUser, subscriptionController.getMySubscription);

export default router;
