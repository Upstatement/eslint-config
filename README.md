# eslint-config

Upstatement's official [`eslint`](https://eslint.org/) configuration.

This ESLint config pulls in [Upstatement's prettier config](https://www.npmjs.com/package/@upstatement/prettier-config).

[List of all ESLint rules](https://eslint.org/docs/rules/)

[Configuring ESLint](https://eslint.org/docs/user-guide/configuring)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@upstatement/eslint-config) using `npm` or `yarn`:

```bash
npm install --save-dev @upstatement/eslint-config
```

## Usage

Create an `.eslintrc` file in your project's root that extends Upstatement's configuration:

```js
module.exports = require("@upstatement/prettier-config");
```

## VS Code auto-save settings

In order to let eslint handle JS files and pretter handle everything else (CSS, Markdown, etc.), here are the VS Code user settings you want:

```json
// Autosave configs
"editor.formatOnSave": true,
// turn it off for JS (otherwise prettier and eslint will fight each other)
"[javascript]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
```
