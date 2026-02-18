import express from 'express';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import franchiseRoutes from './franchiseRoutes.js';
import taskRoutes from './taskRoutes.js';

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
router.use('/superadmin', franchiseRoutes);
router.use('/task', taskRoutes);

export default router;
