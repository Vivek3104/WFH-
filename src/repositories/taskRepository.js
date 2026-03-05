import { Task, Job, Comment, Attachment, sequelize } from '../models/index.js';

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const findActiveTasks = async () => {
  return await Task.findAll({
    where: { isActive: true },
    attributes: {
      include: [
        [
          sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.task_id = Task.id)'),
          'comment_count'
        ],
        [
          sequelize.literal('(SELECT COUNT(*) FROM attachments WHERE attachments.task_id = Task.id)'),
          'file_count'
        ]
      ]
    },
    include: [{ model: Job, as: 'job' }],
    order: [['created_at', 'DESC']],
  });
};

export const findTaskById = async (id) => {
  return await Task.findByPk(id, {
    attributes: {
      include: [
        [
          sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.task_id = Task.id)'),
          'comment_count'
        ],
        [
          sequelize.literal('(SELECT COUNT(*) FROM attachments WHERE attachments.task_id = Task.id)'),
          'file_count'
        ]
      ]
    },
    include: [{ model: Job, as: 'job' }],
  });
};
