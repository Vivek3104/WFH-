import { SubscriptionPlan, UserSubscription, User } from '../models/index.js';
import { Op } from 'sequelize';

class SubscriptionService {
    async getAllPlans() {
        return await SubscriptionPlan.findAll({ where: { isActive: true } });
    }

    async purchasePlan(userId, planId) {
        const plan = await SubscriptionPlan.findByPk(planId);
        if (!plan) throw new Error('Subscription plan not found');

        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + plan.durationDays);

        // If user already has an active subscription, we might want to extend or replace.
        // For simplicity, let's mark old active ones as cancelled and create new one.
        await UserSubscription.update(
            { status: 'cancelled' },
            { where: { userId, status: 'active' } }
        );

        const subscription = await UserSubscription.create({
            userId,
            planId,
            startDate: new Date(),
            expiryDate,
            tasksRemaining: plan.taskLimit,
            status: 'active',
        });

        return subscription;
    }

    async checkExpiries() {
        const now = new Date();
        const expiredCount = await UserSubscription.update(
            { status: 'expired' },
            {
                where: {
                    status: 'active',
                    expiryDate: { [Op.lt]: now },
                },
            }
        );
        return expiredCount;
    }
}

export default new SubscriptionService();
