import subscriptionService from '../services/subscriptionService.js';

export const getPlans = async (req, res) => {
    try {
        const plans = await subscriptionService.getAllPlans();
        res.status(200).json(plans);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const buyPlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user.id;
        const subscription = await subscriptionService.purchasePlan(userId, planId);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMySubscription = async (req, res) => {
    try {
        const userId = req.user.id;
        const subscription = await subscriptionService.getUserSubscription(userId);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
