import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/jobs', authUser, taskController.getJobs);
router.get('/tasks', authUser, taskController.getTasks);
router.get('/task/:id', authUser, taskController.getTaskById);

export default router;
