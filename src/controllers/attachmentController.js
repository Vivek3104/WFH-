import { Attachment, User } from '../models/index.js';

export const getTaskAttachments = async (req, res) => {
    try {
        const { taskId } = req.params;
        const attachments = await Attachment.findAll({
            where: { task_id: taskId },
            include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
            order: [['created_at', 'DESC']],
        });
        res.json(attachments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const uploadTaskAttachment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const attachment = await Attachment.create({
            task_id: taskId,
            user_id: userId,
            file_name: req.file.originalname,
            file_path: `/uploads/tasks/${req.file.filename}`,
            file_type: req.file.mimetype,
            file_size: req.file.size,
        });

        res.status(201).json(attachment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
