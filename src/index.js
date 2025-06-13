const axios = require('axios');
const qs = require('querystring');
const { ApiError, RateLimitError } = require('./errors');

class SmmFollowsApi {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl; // 'https://smmfollows.com/api/v2'
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'User-Agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    /**
     * Internal method to make API requests
     * @param {Object} data - The request payload
     * @returns {Promise<Object>} - The API response
     */
    async _request(data) {
        try {
            const payload = { ...data, key: this.apiKey };
            const response = await this.axiosInstance.post('', qs.stringify(payload), {
                timeout: 10000 // 10 second timeout
            });

            if (response.data && response.data.error) {
                throw new ApiError(response.data.error);
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                throw new RateLimitError('API rate limit exceeded');
            }
            throw error;
        }
    }

    /**
     * Add a new order
     * @param {Object} orderData - Order parameters
     * @returns {Promise<Object>} - Order details
     */
    async createOrder(orderData) {
        return this._request({ ...orderData, action: 'add' });
    }

    /**
     * Get order status
     * @param {number} orderId - The order ID
     * @returns {Promise<Object>} - Order status
     */
    async getOrderStatus(orderId) {
        return this._request({
            action: 'status',
            order: orderId
        });
    }

    /**
     * Get multiple orders status
     * @param {Array<number>} orderIds - Array of order IDs
     * @returns {Promise<Object>} - Orders status
     */
    async getMultiOrderStatus(orderIds) {
        return this._request({
            action: 'status',
            orders: orderIds.join(',')
        });
    }

    /**
     * Get available services
     * @returns {Promise<Object>} - List of services
     */
    async getServices() {
        return this._request({
            action: 'services'
        });
    }

    /**
     * Request refill for an order
     * @param {number} orderId - The order ID
     * @returns {Promise<Object>} - Refill details
     */
    async requestRefill(orderId) {
        return this._request({
            action: 'refill',
            order: orderId
        });
    }

    /**
     * Request refill for multiple orders
     * @param {Array<number>} orderIds - Array of order IDs
     * @returns {Promise<Object>} - Refill details
     */
    async requestMultiRefill(orderIds) {
        return this._request({
            action: 'refill',
            orders: orderIds.join(',')
        });
    }

    /**
     * Get refill status
     * @param {number} refillId - The refill ID
     * @returns {Promise<Object>} - Refill status
     */
    async getRefillStatus(refillId) {
        return this._request({
            action: 'refill_status',
            refill: refillId
        });
    }

    /**
     * Get multiple refills status
     * @param {Array<number>} refillIds - Array of refill IDs
     * @returns {Promise<Object>} - Refills status
     */
    async getMultiRefillStatus(refillIds) {
        return this._request({
            action: 'refill_status',
            refills: refillIds.join(',')
        });
    }

    /**
     * Cancel orders
     * @param {Array<number>} orderIds - Array of order IDs to cancel
     * @returns {Promise<Object>} - Cancellation result
     */
    async cancelOrders(orderIds) {
        return this._request({
            action: 'cancel',
            orders: orderIds.join(',')
        });
    }

    /**
     * Get account balance
     * @returns {Promise<Object>} - Account balance
     */
    async getBalance() {
        return this._request({
            action: 'balance'
        });
    }
}

module.exports = SmmFollowsApi;