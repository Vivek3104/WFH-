import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Withdrawal = sequelize.define('Withdrawal', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  // userId FK and adminId FK added via associations in models/index.js
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  transactionId: { type: DataTypes.STRING, field: 'transaction_id' },
  adminNotes: { type: DataTypes.TEXT, field: 'admin_notes' },
  processedAt: { type: DataTypes.DATE, field: 'processed_at' },
}, {
  tableName: 'withdrawals',
  timestamps: true,
  underscored: true,
});

export default Withdrawal;
