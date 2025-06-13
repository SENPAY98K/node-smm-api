// tests/essential.test.js
const SmmFollowsApi = require('../src');
const { ApiError } = require('../src/errors');

describe('Essential Tests', () => {
    let api;

    beforeAll(() => {
        api = new SmmFollowsApi('test-key');
    });

    test('initializes', () => {
        expect(api.apiKey).toBe('test-key');
    });

    test('throws without API key', () => {
        expect(() => new SmmFollowsApi()).toThrow();
    });

    test('can mock API request', async () => {
        jest.spyOn(api, '_request').mockResolvedValue({ success: true });
        const result = await api.getBalance();
        expect(result.success).toBe(true);
    });
});