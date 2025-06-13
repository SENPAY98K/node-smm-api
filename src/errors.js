class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApiError';
        this.isApiError = true;
    }
}

class RateLimitError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RateLimitError';
        this.isRateLimitError = true;
    }
}

module.exports = {
    ApiError,
    RateLimitError
};