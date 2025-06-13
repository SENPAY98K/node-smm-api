const SmmFollowsApi = require('../src');

(async () => {
    const api = new SmmFollowsApi(
        process.env.API_URL || 'https://smmfollows.com/api/v2',
        process.env.API_KEY || 'your_api_key'
    );

    try {
        // 1. Batch order creation with status monitoring
        const services = await api.getServices();
        const popularService = services.find(s => s.category === 'Instagram'); // Example

        const orders = await Promise.all([
            api.createOrder({
                service: popularService.id,
                link: 'http://instagram.com/post1',
                quantity: 100
            }),
            api.createOrder({
                service: popularService.id,
                link: 'http://instagram.com/post2',
                quantity: 150
            })
        ]);

        console.log('Created orders:', orders.map(o => o.order));

        // 2. Monitor order statuses
        const orderIds = orders.map(o => o.order);
        const checkStatus = async () => {
            const statuses = await api.getMultiOrderStatus(orderIds);
            console.log('Current statuses:', statuses);

            if (statuses.some(s => s.status !== 'Completed')) {
                setTimeout(checkStatus, 60000); // Check again in 1 minute
            }
        };

        await checkStatus();

        // 3. Automatic refill handling
        const completedOrders = orders.filter(o => o.status === 'Completed');
        if (completedOrders.length > 0) {
            const refill = await api.requestMultiRefill(completedOrders.map(o => o.order));
            console.log('Refill initiated:', refill);

            // Track refill status
            const refillStatus = await api.getMultiRefillStatus(refill.map(r => r.refill));
            console.log('Refill status:', refillStatus);
        }

        // 4. Error handling with retries
        const withRetry = async (fn, retries = 3) => {
            try {
                return await fn();
            } catch (error) {
                if (retries > 0) {
                    console.log(`Retrying... (${retries} left)`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    return withRetry(fn, retries - 1);
                }
                throw error;
            }
        };

        const balance = await withRetry(() => api.getBalance());
        console.log('Final balance:', balance);

    } catch (error) {
        console.error('Advanced operation failed:', error);
    }
})();