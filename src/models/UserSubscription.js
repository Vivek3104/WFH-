import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserSubscription = sequelize.define('UserSubscription', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    // userId and planId FKs added via associations
    startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'start_date' },
    expiryDate: { type: DataTypes.DATE, allowNull: false, field: 'expiry_date' },
    tasksRemaining: { type: DataTypes.INTEGER, allowNull: false, field: 'tasks_remaining' },
    status: {
        type: DataTypes.ENUM('active', 'expired', 'cancelled'),
        defaultValue: 'active',
    },
}, {
    tableName: 'user_subscriptions',
    timestamps: true,
    underscored: true,
});

export default UserSubscription;
