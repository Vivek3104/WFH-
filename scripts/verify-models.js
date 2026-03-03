import { User, SubscriptionPlan, UserSubscription, Task, CommissionLog } from '../src/models/index.js';

async function testModels() {
    try {
        console.log('Verifying Model Definitions...');

        const models = { User, SubscriptionPlan, UserSubscription, Task, CommissionLog };

        for (const [name, model] of Object.entries(models)) {
            if (!model) {
                console.error(`Model ${name} is NOT defined!`);
            } else {
                console.log(`Model ${name} is loaded correctly.`);
            }
        }

        // Check associations
        const checkAssoc = (model, assocName) => {
            if (model.associations[assocName]) {
                console.log(`[PASS] ${model.name} has association: ${assocName}`);
            } else {
                console.log(`[FAIL] ${model.name} is missing association: ${assocName}`);
            }
        };

        checkAssoc(User, 'subscriptions');
        checkAssoc(User, 'subusers');
        checkAssoc(User, 'franchise');
        checkAssoc(UserSubscription, 'user');
        checkAssoc(UserSubscription, 'plan');
        checkAssoc(Task, 'assignee');
        checkAssoc(CommissionLog, 'beneficiary');

        console.log('Model verification complete.');
        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

testModels();
