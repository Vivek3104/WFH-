import Admin from '../models/Admin.js';

export const createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};

export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

export const findAdminById = async (id) => {
  return await Admin.findById(id);
};

export const updateAdmin = async (id, updateData) => {
  return await Admin.findByIdAndUpdate(id, updateData, { new: true });
};
