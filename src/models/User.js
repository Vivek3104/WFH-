import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';
import { getFullUrl } from '../utils/urlHelper.js';

const User = sequelize.define('User', {
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
  profileScore: { type: DataTypes.INTEGER, defaultValue: 0, field: 'profile_score' },
  // Bank details (flat columns)
  bankAccountNumber: { type: DataTypes.STRING, field: 'bank_account_number' },
  bankIfscCode: { type: DataTypes.STRING, field: 'bank_ifsc_code' },
  bankAccountHolderName: { type: DataTypes.STRING, field: 'bank_account_holder_name' },
  bankName: { type: DataTypes.STRING, field: 'bank_name' },
  // Government doc (flat columns)
  govtDocType: { type: DataTypes.STRING, field: 'govt_doc_type' },
  govtDocNumber: { type: DataTypes.STRING, field: 'govt_doc_number' },
  govtDocFile: {
    type: DataTypes.STRING,
    field: 'govt_doc_file',
    get() {
      const rawValue = this.getDataValue('govtDocFile');
      return getFullUrl(rawValue);
    }
  },
  wallet: { type: DataTypes.FLOAT, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10);
    },
  },
});

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual getter to expose bankDetails as an object (backward compat with services)
User.prototype.getBankDetails = function () {
  return {
    accountNumber: this.bankAccountNumber,
    ifscCode: this.bankIfscCode,
    accountHolderName: this.bankAccountHolderName,
    bankName: this.bankName,
  };
};

export default User;
