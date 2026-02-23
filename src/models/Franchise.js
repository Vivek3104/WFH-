import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Franchise = sequelize.define('Franchise', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  registrationNumber: { type: DataTypes.STRING, field: 'registration_number' },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_approved' },
  // adminId FK added via association in models/index.js
}, {
  tableName: 'franchises',
  timestamps: true,
  underscored: true,
});

export default Franchise;
