import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/task/:taskId', commentController.getTaskComments);
router.post('/task/:taskId', authenticate, commentController.createTaskComment);

export default router;
