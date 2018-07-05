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

```json
{
  "extends": "@upstatement/eslint-config"
}
```

## Alternative 4 space config

Never fear, ESLint supports [multiple configs](https://eslint.org/docs/developer-guide/shareable-configs#sharing-multiple-configs)!

Just use this in your `.eslintrc` file instead:

```json
{
  "extends": "@upstatement/eslint-config/four-spaces-config"
}
```

## VS Code auto-save settings

In order to let eslint handle JS files and pretter handle everything else (CSS, Markdown, etc.), here are the VS Code user settings you want:

```json
// Autosave configs
"editor.formatOnSave": true,
// turn it off for JS
"[javascript]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
```

## How to test this module locally

Testing thie module locally is a multi-step process since it depends on Upstatement's [prettier config](https://github.com/Upstatement/prettier-config).

First, make sure you have Upstatement's [prettier config](https://github.com/Upstatement/prettier-config) cloned locally. If you don't, go ahead and do that first.

In the **prettier config repo**, create a global link for the package:

```bash
npm link
```

Then in **this repo**, link-install the prettier config

```bash
npm link @upstatement/prettier-config
```

Also in **this repo**, create a global link for this package:

```bash
npm link
```

Finally, in the project you want to use this config for, link-install this package:

```bash
npm link @upstatement/eslint-config
```

And finally in that project's `.eslintrc`, include:

```json
{
  "extends": "@upstatement/eslint-config"
}
```
