import jwt from 'jsonwebtoken';
import { User, Admin } from '../models/index.js';

export const authUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) return res.status(401).json({ error: 'Invalid token' });
    if (!admin.isActive) return res.status(403).json({ error: 'Account is inactive. Contact super admin.' });

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const authSuperAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);
    if (!admin || admin.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
