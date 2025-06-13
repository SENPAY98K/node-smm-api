# SMMFollows API Node.js Client

Non-official Node.js client for many SMM platforms API v2.

## Installation

```bash
npm i node-smm-api
```

## Usage

```javascript
const SmmApi = require("node-smm-api");

const api = new SmmApi("your_api_url_here", "your_api_key_here");

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
-   Support many panels as shown below

## API Documentation

-   SMMFollows: [official SMMFollows API documentation](https://smmfollows.com/api) for available endpoints.
-   SMMPakPanel: [official SMMPakPanel API documentation](https://smmpakpanel.com/api) for available endpoints.
-   JustAnotherPanel: [official JustAnotherPanel API documentation](https://justanotherpanel.com/api) for available endpoints.
-   SMMGo: [official SMMGo API documentation](https://smmgo.io/api) for available endpoints.

## Examples

Check the [examples directory](/examples) for complete usage examples.

## License

MIT
