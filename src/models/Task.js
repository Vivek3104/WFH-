import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  // jobId FK and adminId FK added via associations in models/index.js
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  payoutAmount: { type: DataTypes.FLOAT, allowNull: false, field: 'payout_amount' },
  maxSubmissions: { type: DataTypes.INTEGER, defaultValue: 1, field: 'max_submissions' },
  deadline: { type: DataTypes.DATE },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true,
});

export default Task;
