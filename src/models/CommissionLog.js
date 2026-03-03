import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CommissionLog = sequelize.define('CommissionLog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    beneficiaryId: { type: DataTypes.INTEGER, allowNull: false, field: 'beneficiary_id' },
    sourceUserId: { type: DataTypes.INTEGER, allowNull: false, field: 'source_user_id' },
    taskId: { type: DataTypes.INTEGER, field: 'task_id' },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: {
        type: DataTypes.ENUM('FRANCHISE', 'REFERRAL'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid'),
        defaultValue: 'pending',
    },
}, {
    tableName: 'commission_logs',
    timestamps: true,
    underscored: true,
});

export default CommissionLog;
