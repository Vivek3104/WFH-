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

// ── Franchise ↔ Admin ───────────────────────────────────────────────────────
// A Franchise is created by (belongs to) an Admin
Franchise.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Franchise, { foreignKey: 'admin_id', as: 'franchises' });

// An Admin may be linked to one Franchise (the one it leads)
Admin.belongsTo(Franchise, { foreignKey: 'franchise_id', as: 'franchise' });

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

export { User, Admin, Franchise, Job, Task, WorkSubmission, Withdrawal };
