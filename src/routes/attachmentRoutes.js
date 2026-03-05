import express from 'express';
import multer from 'multer';
import path from 'path';
import * as attachmentController from '../controllers/attachmentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tasks/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get('/task/:taskId', attachmentController.getTaskAttachments);
router.post('/task/:taskId', authenticate, upload.single('file'), attachmentController.uploadTaskAttachment);

export default router;
