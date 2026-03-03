import * as userService from '../services/userService.js';
import { User } from '../models/index.js';

export const registerCompany = async (req, res) => {
    try {
        // Superadmin or Admin action to create a franchise account
        const { name, email, password, companyName, registrationNumber } = req.body;
        const result = await userService.registerUser({
            name,
            email,
            password,
            companyName,
            registrationNumber,
            role: 'franchise',
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addUser = async (req, res) => {
    try {
        // req.user should be provided by auth middleware (role franchise)
        const franchiseId = req.user.id;
        const userData = req.body;

        // Ensure the requester is a franchise
        if (req.user.role !== 'franchise') {
            return res.status(403).json({ error: 'Only franchises can add users directly.' });
        }

        const newUser = await User.create({
            ...userData,
            franchiseId,
            role: 'user',
        });

        const { password, ...userWithoutPassword } = newUser.toJSON();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFranchiseStats = async (req, res) => {
    try {
        const franchiseId = req.user.id;
        const usersCount = await User.count({ where: { franchiseId, role: 'user' } });
        const user = await User.findByPk(franchiseId);

        res.status(200).json({
            totalUsers: usersCount,
            totalCommission: user.walletCommission,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
