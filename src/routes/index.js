import express from 'express';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import superAdminRoutes from './superAdminRoutes.js';
import taskRoutes from './taskRoutes.js';
import franchiseRoutes from './franchiseRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';

const router = express.Router();

/*
|--------------------------------------------------------------------------
| API Route Mounting
|--------------------------------------------------------------------------
| All routes are mounted here to keep app.js clean.
| Example: /api/users, /api/admin, etc.
|--------------------------------------------------------------------------
*/

router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/superadmin', superAdminRoutes);
router.use('/task', taskRoutes);
router.use('/franchise', franchiseRoutes);
router.use('/subscription', subscriptionRoutes);

export default router;
