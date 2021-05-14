# Upstatement ESLint Config

[![npm version](https://badge.fury.io/js/%40upstatement%2Feslint-config.svg)](https://badge.fury.io/js/%40upstatement%2Feslint-config)

Pairs well with our [Prettier config](https://www.npmjs.com/package/@upstatement/prettier-config).

## Table of Contents

- [Upstatement ESLint Config](#upstatement-eslint-config)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configurations](#configurations)
    - [Default Config](#default-config)
    - [Four Spaces Config](#four-spaces-config)
    - [React Config](#react-config)
      - [Using Create React App?](#using-create-react-app)
    - [Vue Config](#vue-config)
  - [Specifying Environments](#specifying-environments)
  - [Editor Integration & Autoformatting](#editor-integration--autoformatting)
    - [VS Code](#vs-code)
    - [Sublime Text](#sublime-text)
    - [Atom](#atom)
  - [Pre-commit Hooks](#pre-commit-hooks)
  - [Publishing to npm](#publishing-to-npm)
  - [Enforced Rules](#enforced-rules)
  - [Overriding Rules](#overriding-rules)

## Installation

This package has several [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies).

Run `npm info "@upstatement/eslint-config@latest" peerDependencies` to list the peer dependencies and versions.

1. Make sure your project is using a Node version >= `10.12.0`

2. Install dependencies

    - **Option 1:** With `npx`

      ```sh
      npx install-peerdeps --dev @upstatement/eslint-config
      ```

      **Note:** `npx` is a package runner that comes with npm 5.2 and higher that makes installing peer dependencies easier

    - **Option 2:** Without `npx`

      ```sh
      npm install --save-dev @upstatement/eslint-config @babel/core@7.x.x @babel/eslint-parser@7.x.x eslint@7.x.x eslint-config-prettier@8.x.x prettier@2.x.x

      # or

      yarn add --dev @upstatement/eslint-config @babel/core@7.x.x @babel/eslint-parser@7.x.x eslint@7.x.x eslint-config-prettier@8.x.x prettier@2.x.x
      ```

3. Create an `.eslintrc` file at the root of your project with the following:

    ```json
    {
      "root": true,
      "extends": "@upstatement"
    }
    ```

    Then make sure to [specify your environment](#specifying-environments) based on your project.

## Configurations

We export four ESLint configurations for your usage:

1. [Default (2 space)](#default-config)
2. [Four Spaces](#four-spaces-config)
3. [React](#react-config)
4. [Vue](#vue-config)

### Default Config

In your `.eslintrc`:

```json
{
  "root": true,
  "extends": "@upstatement"
}
```

> **NOTE:** Make sure to [specify your environment](#specifying-environments) based on your project

### Four Spaces Config

Includes everything in the default config, but replaces the indent rule with 4 spaces instead of 2 spaces.

In your `.eslintrc`:

```json
{
  "root": true,
  "extends": "@upstatement/eslint-config/four-spaces"
}
```

> **NOTE:** Make sure to [specify your environment](#specifying-environments) based on your project

### React Config

Includes everything in the default config, plus environment specification and react-specific rules with

- [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react)
- [`eslint-plugin-jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [`@babel/preset-react`](https://github.com/babel/babel/tree/master/packages/babel-preset-react)

```sh
npx install-peerdeps --dev @upstatement/eslint-config \
  && npm install --save-dev eslint-plugin-react eslint-plugin-jsx-a11y @babel/preset-react
```

**In your `.eslintrc`:**

```json
{
  "root": true,
  "extends": "@upstatement/eslint-config/react"
}
```

**In your `.babelrc`:**

```json
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

#### Using Create React App?

Until recently Create React App didn't give you an easy way to extend the default ESLint configuration short of ejecting. This was particularly problematic as ESLint is run during production builds (with `react-scripts build`), and lint errors would actually result in build failures.

It now supports an [experimental method to extend ESLint](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config). Here's how it works with this configuration:

1. Extend the base config (`react-app`) in your ESLint configuration:

   ```json
   {
     "root": true,
     "extends": ["react-app", "@upstatement/eslint-config/react"]
   }
   ```

2. Add the babel config

   ```json
   {
     "presets": [
       "@babel/preset-react"
     ]
   }
   ```

3. Set the `EXTEND_ESLINT` environment variable in your `.env` file (for local development) and in your hosting providers environment variables configuration (for remote builds):

   ```json
   EXTEND_ESLINT=true
   ```

This will ensure that the same ruleset is enforced for local development and production builds.

### Vue Config

Includes everything in the default config, plus environment specification and vue-specific rules with

- [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue)
- [`vue-eslint-parser`](https://github.com/mysticatea/vue-eslint-parser)

```sh
npx install-peerdeps --dev @upstatement/eslint-config \
  && eslint-plugin-vue vue-eslint-parser
```

In your `.eslintrc`

```json
{
  "root": true,
  "extends": "@upstatement/eslint-config/vue"
}
```

## Specifying Environments

Our default & four spaces configs purposefully do not specify a certain environment as to not make any assumptions about your project. The only environment we do specify by default is `es6`. [View all available environments](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)

Therefore, you should specify your project's environment yourself in your ESLint config. For example:

```json
{
  "root": true,
  "extends": "@upstatement",
  "env": {
    "browser": true,
    "node": true
  }
}
```

## [Editor Integration](https://eslint.org/docs/user-guide/integrations) & Autoformatting

Once you've installed the config, you probably want your editor to lint and fix your code for you.

### VS Code

1. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): `View → Extensions` then find and install ESLint
2. Reload the editor
3. Open your [settings JSON file](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) and add the following

    ```json
    // Format on save with Prettier rules
    "editor.formatOnSave": true,
    // Tell the ESLint plugin to run on save
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    // Turn off Prettier format on save, use ESLint to format instead
    "[javascript]": {
      "editor.formatOnSave": false
    },
    "[vue]": {
      "editor.formatOnSave": false
    },
    "eslint.alwaysShowStatus": true,
    // An array of language identifiers specify the files to be validated
    "eslint.options": {
      "extensions": [".html", ".js", ".vue", ".jsx"]
    },
    ```

### Sublime Text

1. Install [Package Control](https://packagecontrol.io/installation)
2. Install [ESLint-Formatter](https://github.com/TheSavior/ESLint-Formatter)
3. And then allow auto fix on save: `Preferences → Package Settings → ESLint Formatter → Settings` then add `"format_on_save": true` to the settings file

### Atom

1. Install [linter-eslint](https://github.com/AtomLinter/linter-eslint) plugin: `Preferences → Install` then type and install `linter-eslint`
2. Install all dependencies (and restart the editor couple of times during installation)
3. Enable auto fix on save: `Preferences → Packages → linter-eslint` then check `Fix errors on save checkbox`

## Pre-commit Hooks

As another line of defense, if you want ESLint & Prettier to automatically fix your errors on commit, you can use [lint-staged](https://github.com/okonet/lint-staged) with [husky](https://github.com/typicode/husky).

1. Make sure [eslint](#eslint) & [prettier](#prettier) configs are installed and set up

2. Make sure your `npm` version is >= 7.0.0

   ```shell
   npm install -g npm@latest
   ```

3. Make sure your repo has been initialized with git

   ```shell
   git init --initial-branch=main
   ```

4. Install the npm packages

   ```shell
   npm install --save-dev lint-staged husky
   ```

5. Set up the `package.json` stuff

   ```shell
   npm set-script prepare "husky install" && npm run prepare \
     && npm set-script lint-staged "lint-staged" \
     && npx husky add .husky/pre-commit "npm run lint-staged"
   ```

6. Then in your `package.json` add

   ```json
    "lint-staged": {
      "*.{js,css,json,md}": [
        "prettier --write",
        "git add"
      ],
      "*.js": [
        "eslint --fix",
        "git add"
      ]
    }
   ```

## Publishing to npm

Read npm's docs on [How to Update a Package](https://docs.npmjs.com/getting-started/publishing-npm-packages#how-to-update-a-package).

1. Checkout and pull the `main` branch

2. Run the release script to bump the version numbers (the script will create a commit and push up the release branch to GitHub for you)

    ```shell
    ./scripts/release
    ```

    Use [semantic versioning](https://docs.npmjs.com/about-semantic-versioning/) to choose the appropriate version number.

3. Submit and merge a PR from the release branch into `main`

4. Make sure you're logged into npm from the command line using `npm whoami`. If you're not logged in, `npm login` with the credentials in 1pass

5. `npm publish`

## Enforced Rules

Upstatement's ESLint config extends `eslint:recommended` which enables rules that report common problems, which are marked with check marks in the large [list of ESLint rules](https://eslint.org/docs/rules/).

The rules listed below are rules we have enabled on top of those enabled by `eslint:recommended`.

<details>
  <summary>no-console</summary>

  It's perfectly fine to use `console.log` during development, but you shouldn't use `console.log` in production code. If you _really_ need to print something to the console, use `console.warn` or `console.error`.

  > Why? In JavaScript that's designed to be executed in the browser, it’s considered a best practice to avoid using methods on console. Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client. In general, calls using console should be stripped before being pushed to production.

  ```js
  // bad
  console.log('bad');

  // good
  console.warn('Log a warn level message.');
  console.error('Log an error level message.');
  ```

</details>

<details>
  <summary>curly</summary>

  Always use curly braces.

  > Why? Omitting curly braces can cause bugs and decrease code clarity.

  ```js
  // bad
  if (foo) foo++;

  if (foo) {
    baz();
  } else qux();

  // good
  if (foo) {
    foo++;
  }

  if (foo) {
    baz();
  } else {
    qux();
  }
  ```

</details>

<details>
  <summary>eqeqeq</summary>

  Use `===` and `!==` over `==` and `!=`.

  > Why? It's considered good practice to use the type-safe equality operators `===` and `!==` instead of their regular counterparts `==` and `!=`. The reason for this is that `==` and `!=` do type coercion which follows the rather obscure Abstract Equality Comparison Algorithm. For instance, the following statements are all considered true:
  >
  > - [] == false
  > - [] == ![]
  > - 3 == 03

  TL;DR JavaScript is _**WILD**_

  ```js
  // bad
  a == b;
  foo == true;
  bananas != 1;
  value == undefined;
  typeof foo == 'undefined';

  // good
  a === b;
  foo === true;
  bananas !== 1;
  value === undefined;
  typeof foo === 'undefined';
  ```

</details>

<details>
  <summary>no-eq-null</summary>

  Don't write `null` comparisons without type-checking operators.

  > Why? Comparing to `null` without a type-checking operator (`==` or `!=`), can have unintended results as the comparison will evaluate to true when comparing to not just a `null`, but also an `undefined` value.

  ```js
  // bad
  if (foo == null) {
    bar();
  }

  while (qux != null) {
    baz();
  }

  // good
  if (foo === null) {
    bar();
  }

  while (qux !== null) {
    baz();
  }
  ```

</details>

<details>
  <summary>no-use-before-define</summary>

  Don't use constiables before they are defined.

  > Why? In JavaScript, prior to ES6, constiable and function declarations are hoisted to the top of a scope, so it’s possible to use identifiers before their formal declarations in code. This can be confusing and some believe it is best to always declare constiables and functions before using them.
  > In ES6, block-level bindings (`let` and `const`) introduce a “temporal dead zone” where a `ReferenceError` will be thrown with any attempt to access the constiable before its declaration.

  ```js
  // bad
  alert(a);
  const a = 10;

  f();
  function f() {}

  // good
  let a;
  a = 10;
  alert(a);

  function f() {}
  f(1);
  ```

</details>

<details>
  <summary>brace-style</summary>

  Be consistent with brace style for blocks. Keep `else` on the same line as the preceding curly brace.

  ```js
  // bad
  if (foo) {
    bar();
  }
  else {
    baz();
  }

  // good
  if (foo) {
    bar();
  } else {
    baz();
  }
  ```

</details>

<details>
  <summary>comma-dangle</summary>

  Use trailing commas when possible.

  > Why? Trailing commas simplify adding and removing items to objects and arrays, since only the lines you are modifying must be touched. They improve the clarity of diffs when an item is added or removed from an object or array.

  ```js
  // bad
  const foo = {
    bar: baz,
    qux: quux
  };

  const arr = [1, 2];

  // good
  const foo = {
    bar: baz,
    qux: quux,
  };

  const arr = [1, 2];
  ```

</details>

<details>
  <summary>comma-spacing</summary>

  Put spaces after commas. Don't put spaces before commas.

  ```js
  // bad
  const foo = 1,
    bar = 2;
  const arr = [1,2];
  const obj = { foo: bar,baz: qur };
  foo(a,b);

  // good
  const foo = 1,
    bar = 2;
  const arr = [1, 2];
  const obj = { foo: bar, baz: qur };
  foo(a, b);
  ```

</details>

<details>
  <summary>comma-style</summary>

  Commas should come after and on the same line as an array element, object property, or constiable declaration.

  ```js
  // bad
  const foo = 1
    ,bar = 2;

  const foo = 1
    ,bar = 2;

  const foo = ['apples'
               , 'oranges'];

  function bar() {
    return {
      a: 1
      ,b: 2,
    };
  }

  // good
  const foo = 1,
    bar = 2;

  const foo = ['apples', 'oranges'];

  function bar() {
    return {
      a: 1,
      b: 2,
    };
  }
  ```

</details>

<details>
  <summary>func-call-spacing</summary>

  Don't add a space between a function name and the opening parenthesis.

  ```js
  // bad
  fn ();

  // good
  fn();
  ```

</details>

<details>
  <summary>indent</summary>

  This ESLint config defaults to 2 space indentation.

  > Why? The general convention within the JavaScript community is 2 spaces, and ESLint is a "pluggable linting utility for JavaScript and JSX". We could debate 2 spaces vs 4 spaces all day long, so that's why we've provided another configuration for 4 spaces.

  ```js
  // bad
  if (a) {
      b = c;
      function foo(d) {
          e = f;
      }
  }

  // good
  if (a) {
    b = c;
    function foo(d) {
      e = f;
    }
  }
  ```

</details>

<details>
  <summary>key-spacing</summary>

  Use consistent spacing between keys and values in object literals. Use a space after the colon and disallows a space before the colon.

  ```js
  // bad
  const obj = {foo: 42};
  const obj = {foo: 42 };

  // good
  const obj = { foo: 42 };
  ```

</details>

<details>
  <summary>keyword-spacing</summary>

  Use consistent spacing before and after keywords. Use at least one space before and after keywords.

  ```js
  // bad
  if(foo) {
    //...
  }else if(bar) {
    //...
  } else{
    //...
  }

  // good
  if (foo) {
    //...
  } else if (bar) {
    //...
  } else {
    //...
  }
  ```

</details>

<details>
  <summary>object-curly-spacing</summary>

  Use a space inside of braces (except `{}`)

  ```js
  // bad
  const obj = {foo: 'bar'};
  const obj = { foo: 'bar'};
  const obj = {foo: 'bar',
  };
  const {x} = y;
  import {foo } from 'bar';

  // good
  const obj = {};
  const obj = { foo: 'bar' };
  const obj = {
    foo: 'bar',
  };
  const { x } = y;
  import { foo } from 'bar';
  ```

</details>

<details>
  <summary>one-const</summary>

  Use multiple constiable declarations per scope.

  > Why? It simplifies adding and removing constiables, since only the lines you are modifying must be touched. It improves the clarity of diffs when a constiable is added to a scope.

  ```js
  // bad
  function foo() {
    let bar, baz;
    const bar = true,
      baz = false;
  }

  // good
  function foo() {
    let bar;
    let baz;
    const bar = true;
    const baz = false;
  }
  ```

</details>

<details>
  <summary>quotes</summary>

  Use single quotes wherever possible. Use backticks with template literals.

  ```js
  // bad
  const double = double;
  const unescaped = 'a string containing "double" quotes';

  // good
  const single = 'single';
  const backtick = `back${x}tick`;
  ```

</details>

<details>
  <summary>semi</summary>

  Use semicolons at the end of statements.

  > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called Automatic Semicolon Insertion to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

  ```js
  // bad
  const name = 'ESLint'
  let object = {}

  object.method = function() {
    // ...
  }

  // good
  const name = 'ESLint';
  let object = {};

  object.method = function() {
    // ...
  };
  ```

</details>

<details>
  <summary>space-before-function-paren</summary>

  Don't put a space before the `(` of arguments.

  ```js
  // bad
  function foo () {
    // ...
  }

  const bar = function () {
    // ...
  };

  // good
  function foo() {
    // ...
  }

  const bar = function() {
    // ...
  };
  ```

</details>

<details>
  <summary>space-infix-ops</summary>

  Put spaces around infix operators.

  ```js
  // bad
  a+b;

  a+ b;

  a?b : c;

  const a ={ b: 1 };

  // good
  a + b;

  a ? b : c;

  const a = { b: 1 };
  ```

</details>

<details>
  <summary>arrow-body-style</summary>

  Disallow the use of braces around arrow function body as needed. One-liners can be more readable!

  ```js
  // bad
  let foo = () => {
    return 0;
  };
  let foo = () => {
      return {
         bar: {
              foo: 1,
              bar: 2,
          }
      };
  };


  // good
  let foo = () => 0;
  let foo = (retv, name) => {
      retv[name] = true;
      return retv;
  };
  let foo = () => ({
      bar: {
          foo: 1,
          bar: 2,
      }
  });
  ```

</details>

<details>
  <summary>arrow-parens</summary>

  Omit parens when there is only one argument. Unnecessary parens make code less readable.

  ```js
  // bad
  (a) => {};
  (a) => a;
  (a) => {'\n'};
  a.then((foo) => {});
  a.then((foo) => a);
  a((foo) => { if (true) {} });

  // good
  () => {};
  a => {};
  a => a;
  () => {
    '\n';
  };
  ```

</details>

<details>
  <summary>arrow-spacing</summary>

  Put spaces before and after an arrow function’s arrow.

  ```js
  // bad
  ()=> {};
  () =>{};
  a=> {};
  a=>{};

  // good
  () => {};
  a => {};
  a => a;
  () => {
    '\n';
  };
  ```

</details>

<details>
  <summary>no-duplicate-imports</summary>

  All imports from a single module should exist in a single import statement.

  ```js
  // bad
  import { merge } from 'module';
  import something from 'another-module';
  import { find } from 'module';

  // good
  import { merge, find } from 'module';
  import something from 'another-module';
  ```

</details>

<details>
  <summary>no-useless-constructor</summary>

  Don't include useless class constructors that can be safely removed without changing how the class works.

  ```js
  // bad
  class A {
    constructor() {}
  }

  class A extends B {
    constructor(...args) {
      super(...args);
    }
  }

  // good

  class A {
    constructor() {
      doSomething();
    }
  }

  class A extends B {
    constructor() {
      super('foo');
    }
  }
  ```

</details>

<details>
  <summary>no-var</summary>

  Use `let` or `const` instead of `var`.

  > Why? ECMAScript 6 allows programmers to create constiables with block scope instead of function scope using the `let` and `const` keywords.

  ```js
  // bad
  var x = y;
  var CONFIG = {};

  // good
  let x = y;
  const CONFIG = {};
  ```

</details>

<details>
  <summary>prefer-const</summary>

  Use `const` instead of `let` when a constiable is never reassigned.

  > Why? If a constiable is never reassigned, using the `const` declaration is better.
  > `const` declaration tells readers, “this constiable is never reassigned,” reducing cognitive load and improving maintainability.

  ```js
  // bad

  // it's initialized and never reassigned.
  let a = 3;
  console.log(a);

  let a;
  a = 0;
  console.log(a);

  // good

  // it's reassigned after initialized.
  let a;
  a = 0;
  a = 1;
  console.log(a);

  // it's initialized in a different block from the declaration.
  let a;
  if (true) {
    a = 0;
  }
  console.log(a);
  ```

</details>

<details>
  <summary>prefer-template</summary>

  Use template literals instead of string concatenation.

  ```js
  // bad
  const str = 'Hello,' + name + '!';
  const str = 'Time: ' + (12 * 60 * 60 * 1000);

  // good
  const str = 'Hello World!';
  const str = `Hello, ${name}!`;
  const str = `Time: ${12 * 60 * 60 * 1000}`;
  ```

</details>

## Overriding Rules

If you'd like to override any rules, you can add the rules to your `.eslintrc` file.

```json
{
  "root": true,
  "extends": "@upstatement",
  "rules": {
    "no-console": "off"
  }
}
```
