const SmmFollowsApi = require('../src');

(async () => {
    const api = new SmmFollowsApi(
        process.env.API_URL || 'https://smmfollows.com/api/v2',
        process.env.API_KEY || 'your_api_key'
    );

    try {
        // 1. Default Order
        const defaultOrder = await api.createOrder({
            service: 1, // Replace with actual service ID
            link: 'http://example.com/test',
            quantity: 100,
            runs: 2,
            interval: 5
        });
        console.log('Default Order:', defaultOrder);

        // 2. SEO Order
        const seoOrder = await api.createOrder({
            service: 2,
            link: 'http://example.com/seo',
            quantity: 50,
            keywords: "test, testing, seo"
        });
        console.log('SEO Order:', seoOrder);

        // 3. Custom Comments
        const commentsOrder = await api.createOrder({
            service: 3,
            link: 'http://instagram.com/post',
            comments: "Great post!\nAwesome content\n👍\n🔥"
        });
        console.log('Comments Order:', commentsOrder);

        // 4. Mentions Order
        const mentionsOrder = await api.createOrder({
            service: 4,
            link: 'http://twitter.com/tweet',
            quantity: 200,
            usernames: "user1,user2,user3"
        });
        console.log('Mentions Order:', mentionsOrder);

        // 5. Drip-feed Order
        const dripFeedOrder = await api.createOrder({
            service: 5,
            link: 'http://example.com/drip',
            quantity: 500,
            runs: 10,
            interval: 60
        });
        console.log('Drip-feed Order:', dripFeedOrder);

        // 6. Subscription Order (Old posts only)
        const subscriptionOrder = await api.createOrder({
            service: 6,
            username: 'target_user',
            min: 100,
            max: 110,
            posts: 0,
            delay: 30,
            expiry: '12/31/2023'
        });
        console.log('Subscription Order:', subscriptionOrder);

    } catch (error) {
        console.error('Error creating orders:', error.message);
        if (error.isApiError) {
            console.error('API Error Details:', error);
        }
    }
})();