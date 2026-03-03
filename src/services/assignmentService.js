import { Task, UserSubscription, User } from '../models/index.js';
import { Op } from 'sequelize';

class AssignmentService {
    /**
     * Auto-assign available tasks to users with active subscriptions.
     */
    async autoAssignTasks() {
        try {
            const availableTasks = await Task.findAll({
                where: { status: 'available', isActive: true },
                limit: 1000, // Batch process
            });

            if (availableTasks.length === 0) return { message: 'No available tasks to assign.' };

            // Find users with active subscriptions and tasks remaining
            const activeSubscriptions = await UserSubscription.findAll({
                where: {
                    status: 'active',
                    tasksRemaining: { [Op.gt]: 0 },
                    expiryDate: { [Op.gt]: new Date() },
                },
                include: [{ model: User, as: 'user', where: { isActive: true } }],
            });

            if (activeSubscriptions.length === 0) return { message: 'No eligible users to assign tasks to.' };

            let assignedCount = 0;
            let subIndex = 0;

            for (const task of availableTasks) {
                // Simple round-robin or first-come assignment
                // If we run out of subscribers, stop
                if (subIndex >= activeSubscriptions.length) break;

                const subscription = activeSubscriptions[subIndex];

                // Assign task
                task.assignedToId = subscription.user_id;
                task.status = 'assigned';
                await task.save();

                // Update subscription
                subscription.tasksRemaining -= 1;
                if (subscription.tasksRemaining <= 0) {
                    // Remove from pool for this cycle if no tasks left
                    activeSubscriptions.splice(subIndex, 1);
                } else {
                    subIndex = (subIndex + 1) % activeSubscriptions.length;
                }

                await subscription.save();
                assignedCount++;
            }

            return { assignedCount, remainingTasks: availableTasks.length - assignedCount };
        } catch (error) {
            console.error('AutoAssignTasks Error:', error);
            throw error;
        }
    }
}

export default new AssignmentService();
