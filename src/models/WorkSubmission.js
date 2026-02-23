import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { getFullUrl } from '../utils/urlHelper.js';

const WorkSubmission = sequelize.define('WorkSubmission', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  // taskId FK, userId FK, reviewedBy FK added via associations in models/index.js
  submissionData: { type: DataTypes.TEXT, field: 'submission_data' },
  submissionFiles: {
    type: DataTypes.JSON,
    defaultValue: [],
    field: 'submission_files',
    get() {
      const rawValue = this.getDataValue('submissionFiles');
      if (!rawValue) return [];
      return Array.isArray(rawValue) ? rawValue.map(file => getFullUrl(file)) : [getFullUrl(rawValue)];
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  adminNotes: { type: DataTypes.TEXT, field: 'admin_notes' },
  reviewedAt: { type: DataTypes.DATE, field: 'reviewed_at' },
}, {
  tableName: 'work_submissions',
  timestamps: true,
  underscored: true,
});

export default WorkSubmission;
