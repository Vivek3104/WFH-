import { User, CommissionLog, Task } from '../models/index.js';

class CommissionService {
    /**
     * Distribute commissions after a task is approved/verified.
     * @param {number} taskId 
     * @param {number} userId 
     */
    async distributeCommissions(taskId, userId) {
        try {
            const task = await Task.findByPk(taskId);
            const user = await User.findByPk(userId);

            if (!task || !user) throw new Error('Task or User not found for commission distribution.');

            const payout = task.payoutAmount;

            // 1. Referral Commission (5% to parent user)
            if (user.parentId) {
                const parent = await User.findByPk(user.parentId);
                if (parent) {
                    const referralComm = payout * 0.05;
                    parent.walletCommission = (parent.walletCommission || 0) + referralComm;
                    await parent.save();

                    await CommissionLog.create({
                        beneficiaryId: parent.id,
                        sourceUserId: user.id,
                        taskId: task.id,
                        amount: referralComm,
                        type: 'REFERRAL',
                        status: 'paid'
                    });
                }
            }

            // 2. Franchise Commission (10% to franchise)
            if (user.franchiseId) {
                const franchise = await User.findByPk(user.franchiseId);
                if (franchise) {
                    const franchiseComm = payout * 0.10; // Default 10%
                    franchise.walletCommission = (franchise.walletCommission || 0) + franchiseComm;
                    await franchise.save();

                    await CommissionLog.create({
                        beneficiaryId: franchise.id,
                        sourceUserId: user.id,
                        taskId: task.id,
                        amount: franchiseComm,
                        type: 'FRANCHISE',
                        status: 'paid'
                    });
                }
            }

            // 3. Update User Wallet (already handled in adminService, but we ensures it's correct)
            // Actually, adminService adds it to user.wallet. That's fine.

        } catch (error) {
            console.error('Commission Distribution Error:', error);
            throw error;
        }
    }
}

export default new CommissionService();
