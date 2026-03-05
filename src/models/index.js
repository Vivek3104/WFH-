/**
 * models/index.js
 * Defines all Sequelize associations and re-exports models.
 * Import from this file instead of individual model files to ensure
 * associations are always set up before any query runs.
 */

import User from './User.js';
import Admin from './Admin.js';
import Franchise from './Franchise.js';
import Job from './Job.js';
import Task from './Task.js';
import WorkSubmission from './WorkSubmission.js';
import Withdrawal from './Withdrawal.js';
import SubscriptionPlan from './SubscriptionPlan.js';
import UserSubscription from './UserSubscription.js';
import CommissionLog from './CommissionLog.js';
import Comment from './Comment.js';
import Attachment from './Attachment.js';
import sequelize from '../config/db.js';

// ── Franchise ↔ Admin ───────────────────────────────────────────────────────
Franchise.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Franchise, { foreignKey: 'admin_id', as: 'franchises' });
Admin.belongsTo(Franchise, { foreignKey: 'franchise_id', as: 'franchise' });

// ── User Hierarchy ──────────────────────────────────────────────────────────
User.belongsTo(User, { foreignKey: 'franchise_id', as: 'franchise' });
User.hasMany(User, { foreignKey: 'franchise_id', as: 'users' });

User.belongsTo(User, { foreignKey: 'parent_id', as: 'parent' });
User.hasMany(User, { foreignKey: 'parent_id', as: 'subusers' });

User.belongsTo(User, { foreignKey: 'referred_by_id', as: 'referrer' });

// ── Subscriptions ───────────────────────────────────────────────────────────
User.hasMany(UserSubscription, { foreignKey: 'user_id', as: 'subscriptions' });
UserSubscription.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

SubscriptionPlan.hasMany(UserSubscription, { foreignKey: 'plan_id', as: 'subscriptions' });
UserSubscription.belongsTo(SubscriptionPlan, { foreignKey: 'plan_id', as: 'plan' });

// ── Task Assignment ────────────────────────────────────────────────────────
Task.belongsTo(User, { foreignKey: 'assigned_to_id', as: 'assignee' });
User.hasMany(Task, { foreignKey: 'assigned_to_id', as: 'assignedTasks' });

// ── Commission Logs ────────────────────────────────────────────────────────
CommissionLog.belongsTo(User, { foreignKey: 'beneficiary_id', as: 'beneficiary' });
CommissionLog.belongsTo(User, { foreignKey: 'source_user_id', as: 'source' });
CommissionLog.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });

// ── Job ↔ Admin / Franchise ─────────────────────────────────────────────────
Job.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Job, { foreignKey: 'admin_id', as: 'jobs' });

Job.belongsTo(Franchise, { foreignKey: 'franchise_id', as: 'franchise' });
Franchise.hasMany(Job, { foreignKey: 'franchise_id', as: 'jobs' });

// ── Task ↔ Job / Admin ──────────────────────────────────────────────────────
Task.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
Job.hasMany(Task, { foreignKey: 'job_id', as: 'tasks' });

Task.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Task, { foreignKey: 'admin_id', as: 'tasks' });

// ── WorkSubmission ↔ Task / User / Admin ────────────────────────────────────
WorkSubmission.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
Task.hasMany(WorkSubmission, { foreignKey: 'task_id', as: 'submissions' });

WorkSubmission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(WorkSubmission, { foreignKey: 'user_id', as: 'submissions' });

WorkSubmission.belongsTo(Admin, { foreignKey: 'reviewed_by', as: 'reviewer' });

// ── Withdrawal ↔ User / Admin ───────────────────────────────────────────────
Withdrawal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Withdrawal, { foreignKey: 'user_id', as: 'withdrawals' });

Withdrawal.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });

// ── Comments ───────────────────────────────────────────────────────────────
Comment.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
Task.hasMany(Comment, { foreignKey: 'task_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });

// ── Attachments ────────────────────────────────────────────────────────────
Attachment.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
Task.hasMany(Attachment, { foreignKey: 'task_id', as: 'attachments' });
Attachment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Attachment, { foreignKey: 'user_id', as: 'attachments' });

export {
    User, Admin, Franchise, Job, Task, WorkSubmission, Withdrawal,
    SubscriptionPlan, UserSubscription, CommissionLog, Comment, Attachment,
    sequelize
};

