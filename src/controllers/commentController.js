import { Comment, User } from '../models/index.js';

export const getTaskComments = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await Comment.findAll({
            where: { task_id: taskId },
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
            order: [['created_at', 'ASC']],
        });
        res.json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createTaskComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { content } = req.body;
        const userId = req.user.id; // Assumes auth middleware sets req.user

        const comment = await Comment.create({
            task_id: taskId,
            user_id: userId,
            content,
        });

        const commentWithUser = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
        });

        res.status(201).json(commentWithUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
