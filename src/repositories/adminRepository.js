import { Admin } from '../models/index.js';

export const createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};

export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ where: { email } });
};

export const findAdminById = async (id) => {
  return await Admin.findByPk(id);
};

export const updateAdmin = async (id, updateData) => {
  await Admin.update(updateData, { where: { id } });
  return await Admin.findByPk(id);
};
