import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';
import { getFullUrl } from '../utils/urlHelper.js';

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  profilePic: {
    type: DataTypes.STRING,
    field: 'profile_pic',
    get() {
      const rawValue = this.getDataValue('profilePic');
      return getFullUrl(rawValue);
    }
  },
  // Company details (flat columns)
  companyName: { type: DataTypes.STRING, field: 'company_name' },
  registrationNumber: { type: DataTypes.STRING, field: 'registration_number' },
  address: { type: DataTypes.STRING },
  gstNumber: { type: DataTypes.STRING, field: 'gst_number' },
  // franchiseId FK added via association in models/index.js
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_approved' },
  role: {
    type: DataTypes.ENUM('admin', 'superadmin'),
    defaultValue: 'admin',
  },
}, {
  tableName: 'admins',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password) admin.password = await bcrypt.hash(admin.password, 10);
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) admin.password = await bcrypt.hash(admin.password, 10);
    },
  },
});

Admin.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default Admin;
