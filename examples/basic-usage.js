const SmmFollowsApi = require('../src');

(async () => {
    try {
        const api = new SmmFollowsApi(
            process.env.API_URL || 'https://smmfollows.com/api/v2',
            process.env.API_KEY || 'your_api_key'
        );

        // Get services
        const services = await api.getServices();
        console.log('Available services:', services);

        // Get balance
        const balance = await api.getBalance();
        console.log('Account balance:', balance);

    } catch (error) {
        console.error('Error:', error.message);
        if (error.isApiError) {
            console.error('API returned an error');
        }
    }
})();