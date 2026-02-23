import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING },
  // adminId FK and franchiseId FK added via associations in models/index.js
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
}, {
  tableName: 'jobs',
  timestamps: true,
  underscored: true,
});

export default Job;
