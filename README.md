# eslint-config

Upstatement's official [`eslint`](https://eslint.org/) configuration.

This module depends on [Upstatement's prettier config](https://www.npmjs.com/package/@upstatement/prettier-config). We let eslint run prettier for javascript files and let prettier format the rest of the files (HTML, CSS, etc.)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@upstatement/eslint-config) using `npm` or `yarn`:

```bash
npm install --save-dev @upstatement/eslint-config
```

## Usage

Create an `.eslintrc` file in your project's root that extends Upstatement's configuration:

```js
module.exports = require('@upstatement/prettier-config');
```
