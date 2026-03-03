import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    taskLimit: { type: DataTypes.INTEGER, allowNull: false, field: 'task_limit' },
    durationDays: { type: DataTypes.INTEGER, defaultValue: 30, field: 'duration_days' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
}, {
    tableName: 'subscription_plans',
    timestamps: true,
    underscored: true,
});

export default SubscriptionPlan;
