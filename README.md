# eslint-config

[![npm version](https://badge.fury.io/js/%40upstatement%2Feslint-config.svg)](https://badge.fury.io/js/%40upstatement%2Feslint-config)

Upstatement's [`ESLint`](https://eslint.org/) configuration.

Pairs well with our [`Prettier configuration`](https://www.npmjs.com/package/@upstatement/prettier-config).

## Installation

This package has several [peerDependencies](https://docs.npmjs.com/files/package.json#peerdependencies). Run `npm info "@upstatement/eslint-config@latest" peerDependencies` to list the peer dependencies and versions.

### With `npx`

  Requires **npm 5.2+ and higher**

  ```sh
  npx install-peerdeps @upstatement/eslint-config --dev
  ```

### Without `npx`

#### npm

```sh
npm install --save-dev @upstatement/eslint-config eslint babel-eslint prettier eslint-config-prettier
```

#### yarn

```sh
yarn add --dev @upstatement/eslint-config eslint babel-eslint prettier eslint-config-prettier
```

## Usage

We export three ESLint configurations for your usage:

1. [Default (2 space)](#default-config)
2. [Four Spaces](#four-spaces-config)
3. [React](#react-config)

### Default Config

Create an `.eslintrc` file at the root of your project that contains:

```json
{
  "extends": "@upstatement"
}
```

❗️ **Note:** Our default config purposefully does not specify a certain [environment](https://eslint.org/docs/user-guide/configuring#specifying-environments) as to not make any assumptions about your project. You should specify these yourself in your project's `.eslintrc`. For example:

```json
{
  "extends": "@upstatement",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  }
}
```

### Four Spaces Config

This includes everything in the default config, but replaces the indent rule with 4 spaces instead of 2 spaces.

Use this in your `.eslintrc` file:

```json
{
  "extends": "@upstatement/eslint-config/four-spaces"
}
```

### React Config

This includes everything in the default config, plus some extra react linting.

Use this in your `.eslintrc` file:

```json
{
  "extends": "@upstatement/eslint-config/react"
}
```

In addition to installing this module with the [instructions above](#installation), you will also need to install [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react).

```sh
npm install --save-dev eslint-plugin-react
```

## [Editor Integration](https://eslint.org/docs/user-guide/integrations#editors)

### Visual Studio Code

1. Install ESLint extension: `View → Extensions` then find and install ESLint
2. Reload the editor
3. In your user settings `Code → Preferences → Settings` add `"eslint.autoFixOnSave": true`

### Sublime Text 3

1. Install [Package Control](https://packagecontrol.io/installation)
2. Install [ESLint-Formatter](https://github.com/TheSavior/ESLint-Formatter)
3. And then allow auto fix on save: `Preferences → Package Settings → ESLint Formatter → Settings` then add `"format_on_save": true` to the settings file

### Atom

1. Install [linter-eslint](https://github.com/AtomLinter/linter-eslint) plugin: `Preferences → Install` then type and install `linter-eslint`
2. Install all dependencies (and restart the editor couple of times during installation)
3. Enable auto fix on save: `Preferences → Packages → linter-eslint` then check `Fix errors on save checkbox`

## Pre-commit Hook

As another line of defense, if you want ESLint to automatically fix your errors on commit, you can use [`lint-staged`](https://github.com/okonet/lint-staged) with [`husky`](https://github.com/typicode/husky), which manage git hooks.

1. `npm install --save-dev lint-staged husky`
2. Update your `package.json` like this:

```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"]
  }
}
```

## How to publish to npm

Read npm's docs on [How to Update a Package](https://docs.npmjs.com/getting-started/publishing-npm-packages#how-to-update-a-package).

1. `npm login`
    * Make sure you're logged into Upstatement's npm account with the credentials from 1pass. `npm whoami` will tell you if you're already logged in.
2. `npm version <update_type>`
    * `update_type` can be `patch`, `minor`, or `major`. If you don't know which one to use, go read about [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning).
3. `npm publish`

## Enforced Rules

Upstatement's ESLint config extends `eslint:recommended` which enables rules that report common problems, which are marked with check marks in the large [list of ESLint rules](https://eslint.org/docs/rules/).

The rules listed below are rules we have enabled on top of those enabled by `eslint:recommended`.

* [`no-console`](https://eslint.org/docs/rules/no-console)

  It's perfectly fine to use `console.log` during development, but you shouldn't use `console.log` in production code. If you _really_ need to print something to the console, use `console.warn` or `console.error`.

  > Why? In JavaScript that's designed to be executed in the browser, it’s considered a best practice to avoid using methods on console. Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client. In general, calls using console should be stripped before being pushed to production.

  ```js
  // bad
  console.log('bad');

  // good
  console.warn('Log a warn level message.');
  console.error('Log an error level message.');
  ```

* [`curly`](https://eslint.org/docs/rules/curly)

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

* [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq)

  Use `===` and `!==` over `==` and `!=`.

  > Why? It's considered good practice to use the type-safe equality operators `===` and `!==` instead of their regular counterparts `==` and `!=`. The reason for this is that `==` and `!=` do type coercion which follows the rather obscure Abstract Equality Comparison Algorithm. For instance, the following statements are all considered true:
  > * [] == false
  > * [] == ![]
  > * 3 == 03

  TL;DR JavaScript is _**WILD**_

  ```js
  // bad
  a == b
  foo == true
  bananas != 1
  value == undefined
  typeof foo == 'undefined'

  // good
  a === b
  foo === true
  bananas !== 1
  value === undefined
  typeof foo === 'undefined'
  ```

* [`no-eq-null`](https://eslint.org/docs/rules/no-eq-null)

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

* [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define)

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

* [`brace-style`](https://eslint.org/docs/rules/brace-style)

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

* [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle)

  Use trailing commas when possible.

  > Why? Trailing commas simplify adding and removing items to objects and arrays, since only the lines you are modifying must be touched. They improve the clarity of diffs when an item is added or removed from an object or array.

  ```js
  // bad
  const foo = {
    bar: baz,
    qux: quux
  };

  const arr = [1,2,];

  // good
  const foo = {
    bar: baz,
    qux: quux,
  };

  const arr = [1,2];
  ```

* [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

  Put spaces after commas. Don't put spaces before commas.

  ```js
  // bad
  const foo = 1 ,bar = 2;
  const arr = [1 , 2];
  const obj = {foo: bar ,baz: qur};
  foo(a ,b);

  // good
  const foo = 1, bar = 2;
  const arr = [1, 2];
  const obj = {foo: bar, baz: qur};
  foo(a, b);
  ```

* [`comma-style`](https://eslint.org/docs/rules/comma-style)

  Commas should come after and on the same line as an array element, object property, or constiable declaration.

  ```js
  // bad
  const foo = 1
  ,
  bar = 2;

  const foo = 1
    , bar = 2;

  const foo = ['apples'
  , 'oranges'];

  function bar() {
    return {
      'a': 1
      ,'b': 2
    };
  }

  // good
  const foo = 1, bar = 2;

  const foo = 1,
        bar = 2;

  const foo = ['apples',
              'oranges'];

  function bar() {
    return {
      'a': 1,
      'b': 2
    };
  }
  ```

* [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

  Don't add a space between a function name and the opening parenthesis.

  ```js
  // bad
  fn ();

  // good
  fn();
  ```

* [`indent`](https://eslint.org/docs/rules/indent)

  This ESLint config defaults to 2 space indentation.

  > Why? The general convention within the JavaScript community is 2 spaces, and ESLint is a "pluggable linting utility for JavaScript and JSX". We could debate 2 spaces vs 4 spaces all day long, so that's why we've provided another configuration for 4 spaces.

  ```js
  // bad
  if (a) {
      b=c;
      function foo(d) {
          e=f;
      }
  }

  foo
  .bar
  .baz()

  // good
  if (a) {
    b = c;
    function foo(d) {
      e = f;
    }
  }

  foo
    .bar
    .baz();
  ```

* [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

  Use consistent spacing between keys and values in object literals. Use a space after the colon and disallows a space before the colon.

  ```js
  // bad
  const obj = { foo : 42 };
  const obj = { foo:42 };

  // good
  const obj = { foo: 42 };
  ```

* [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing)

  Use consistent spacing before and after keywords. Use at least one space before and after keywords.

  ```js
  // bad
  if (foo) {
    //...
  }else if (bar) {
    //...
  }else {
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

* [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing)

  Use a space inside of braces (except `{}`)

  ```js
  // bad
  const obj = {'foo': 'bar'};
  const obj = {'foo': 'bar' };
  const obj = {
    'foo':'bar'};
  const {x} = y;
  import {foo } from 'bar';

  // good
  const obj = {};
  const obj = { 'foo': 'bar' };
  const obj = {
    'foo': 'bar'
  };
  const { x } = y;
  import { foo } from 'bar';
  ```

* [`one-const`](https://eslint.org/docs/rules/one-const)

  Use multiple constiable declarations per scope.

  > Why? It simplifies adding and removing constiables, since only the lines you are modifying must be touched. It improves the clarity of diffs when a constiable is added to a scope.

  ```js
  // bad
  function foo() {
    let bar,
        baz;
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

* [`quotes`](https://eslint.org/docs/rules/quotes)

  Use single quotes wherever possible. Use backticks with template literals.

  ```js
  // bad
  const double = double;
  const unescaped = a string containing 'single' quotes;

  // good
  const single = 'single';
  const backtick = `back${x}tick`;
  ```

* [`semi`](https://eslint.org/docs/rules/semi)

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

* [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren)

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

* [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops)

  Put spaces around infix operators.

  ```js
  // bad
  a+b

  a+ b

  a?b:c

  const a={b:1};

  // good
  a + b

  a ? b : c

  const a = { b:1 };
  ```

* [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing)

  Put spaces before and after an arrow function’s arrow.

  ```js
  // bad
  ()=> {};
  () =>{};
  (a)=> {};
  (a) =>{};

  // good
  () => {};
  (a) => {};
  a => a;
  () => {'\n'};
  ```

* [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)

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

* [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

  Don't include useless class constructors that can be safely removed without changing how the class works.

  ```js
  // bad
  class A {
    constructor () {
    }
  }

  class A extends B {
    constructor (...args) {
      super(...args);
    }
  }

  // good

  class A {
    constructor () {
      doSomething();
    }
  }

  class A extends B {
    constructor() {
      super('foo');
    }
  }
  ```

* [`no-const`](https://eslint.org/docs/rules/no-const)

  Use `let` or `const` instead of `const`.

  > Why? ECMAScript 6 allows programmers to create constiables with block scope instead of function scope using the `let` and `const` keywords.

  ```js
  // bad
  const x = y;
  const CONFIG = {};

  // good
  let x = y;
  const CONFIG = {};
  ```

* [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

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

* [`prefer-template`](https://eslint.org/docs/rules/prefer-template)

  Use template literals instead of string concatenation.

  ```js
  // bad
  const str = Hello,  + name + !;
  const str = Time:  + (12 * 60 * 60 * 1000);

  // good
  const str = Hello World!;
  const str = `Hello, ${name}!`;
  const str = `Time: ${12 * 60 * 60 * 1000}`;
  ```
