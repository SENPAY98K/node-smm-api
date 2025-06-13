# SMMFollows API Node.js Client

Official Node.js client for the SMMFollows API v2.

## Installation

```bash
npm install smmfollows-api
```

## Usage

```javascript
const SmmFollowsApi = require("smmfollows-api");

const api = new SmmFollowsApi("your_api_url_here", "your_api_key_here");

// Get account balance
api.getBalance()
	.then(balance => console.log(balance))
	.catch(error => console.error(error));
```

## Features

-   Full API v2 coverage
-   Promise-based interface
-   Custom error handling
-   TypeScript support (if applicable)

## API Documentation

-   SMMFollows: [official SMMFollows API documentation](https://smmfollows.com/api) for available endpoints.
-   SMMPakPanel: [official SMMPakPanel API documentation](https://smmpakpanel.com/api) for available endpoints.
-   JustAnotherPanel: [official JustAnotherPanel API documentation](https://justanotherpanel.com/api) for available endpoints.
-   SMMGo: [official SMMGo API documentation](https://smmgo.io/api) for available endpoints.

## Examples

Check the [examples directory](/examples) for complete usage examples.

## License

MIT
