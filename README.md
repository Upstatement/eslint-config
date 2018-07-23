# eslint-config

Upstatement's official [`eslint`](https://eslint.org/) configuration.

[Configuring ESLint](https://eslint.org/docs/user-guide/configuring)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@upstatement/eslint-config) using `npm` or `yarn`:

```bash
npx install-peerdeps --dev @upstatement/eslint-config
```

## Usage

Create an `.eslintrc` file in your project's root that extends Upstatement's configuration:

```json
{
  "extends": "@upstatement"
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

## Editor Setup for Autosaving

### VS Code

In your user settings (`Code` > `Preferences` > `Settings`) add:

```json
editor.formatOnSave: true,
eslint.autoFixOnSave: true,
eslint.alwaysShowStatus: true,
```

### Sublime Text

TBD

### Atom

TBD

## How to publish to NPM

Read npm's docs on [How to Update a Package](https://docs.npmjs.com/getting-started/publishing-npm-packages#how-to-update-a-package).

Essentially:

  1. Make sure you're logged into Upstatement's npm account. `npm whoami` will tell you if you're already logged in. If not, type `npm login` and use our credentials from 1pass.
  2. Update the package version: `npm version <update_type>` (`update_type` being patch, minor, or major. If you don't know which one to use, go read about [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning)).
  3. Publish it: `npm publish`

## Enforced Rules

Upstatement's ESLint config extends `eslint:recommended` which enables rules that report common problems, which are marked with check marks in the large [list of ESLint rules](https://eslint.org/docs/rules/).

The rules listed below are rules we have enabled on top of those enabled by `eslint:recommended`.

- ### [`no-console`](https://eslint.org/docs/rules/no-console)

  It's perfectly fine to use `console.log` during development, but you shouldn't use `console.log` in production code. If you _really_ need to print something to the console, use `console.warn` or `console.error`.

  > Why? In JavaScript that's designed to be executed in the browser, it’s considered a best practice to avoid using methods on console. Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client. In general, calls using console should be stripped before being pushed to production.

  ```js
  // bad
  console.log('bad');

  // good
  console.warn('Log a warn level message.');
  console.error('Log an error level message.');
  ```

- ### [`curly`](https://eslint.org/docs/rules/curly)

  Always use curly braces.

  > Why? Omitting curly braces can cause bugs and decrease code clarity.

  ```js
  // bad
  if (foo) foo++;

  while (bar)
    baz();

  if (foo) {
    baz();
  } else qux();

  // good
  if (foo) {
    foo++;
  }

  while (bar) {
    baz();
  }

  if (foo) {
      baz();
  } else {
    qux();
  }
  ```

- ### [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq)

  Use `===` and `!==` over `==` and `!=`.

  > Why? It's considered good practice to use the type-safe equality operators `===` and `!==` instead of their regular counterparts `==` and `!=`. The reason for this is that `==` and `!=` do type coercion which follows the rather obscure Abstract Equality Comparison Algorithm. For instance, the following statements are all considered true:
  > - ### [] == false
  > - ### [] == ![]
   > - 3 == 03

  TL;DR JavaScript is _**WILD**_

  ```js
  // bad
  a == b
  foo == true
  bananas != 1
  value == undefined
  typeof foo == 'undefined'
  'hello' != 'world'
  0 == 0
  true == true
  foo == null

  // good
  a === b
  foo === true
  bananas !== 1
  value === undefined
  typeof foo === 'undefined'
  'hello' !== 'world'
  0 === 0
  true === true
  foo === null
  ```

- ### [`no-eq-null`](https://eslint.org/docs/rules/no-eq-null)

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

- ### [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define)

  Don't use variables before they are defined.

  > Why? In JavaScript, prior to ES6, variable and function declarations are hoisted to the top of a scope, so it’s possible to use identifiers before their formal declarations in code. This can be confusing and some believe it is best to always declare variables and functions before using them.
  > In ES6, block-level bindings (`let` and `const`) introduce a “temporal dead zone” where a `ReferenceError` will be thrown with any attempt to access the variable before its declaration.

  ```js
  // bad
  alert(a);
  var a = 10;

  f();
  function f() {}

  function g() {
    return b;
  }
  var b = 1;

  {
    alert(c);
    let c = 1;
  }

  // good
  var a;
  a = 10;
  alert(a);

  function f() {}
  f(1);

  var b = 1;
  function g() {
    return b;
  }

  {
    let c;
    c++;
  }
  ```

- ### [`brace-style`](https://eslint.org/docs/rules/brace-style)

  Be consistent with brace style for blocks. Keep `else` on the same line as the preceding curly brace.

  ```js
  // bad
  if (foo) {
    bar();
  }
  else {
    baz();
  }

  if (foo) bar();
  else if (baz) boom();

  // good
  if (foo) {
    bar();
  } else {
    baz();
  }

  if (foo) { bar(); }
  ```

- ### [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle)

  Use trailing commas when possible.

  > Why? Trailing commas simplify adding and removing items to objects and arrays, since only the lines you are modifying must be touched. They improve the clarity of diffs when an item is added or removed from an object or array.

  ```js
  // bad
  var foo = {
    bar: baz,
    qux: quux
  };

  var foo = { bar: baz, qux: quux, };

  var arr = [1,2,];

  var arr = [1,
    2,];

  var arr = [
    1,
    2
  ];

  foo({
    bar: baz,
    qux: quux
  });

  // good
  var foo = {
    bar: baz,
    qux: quux,
  };

  var foo = {bar: baz, qux: quux};
  var arr = [1,2];

  var arr = [1,
    2];

  var arr = [
    1,
    2,
  ];

  foo({
    bar: baz,
    qux: quux,
  });
  ```

- ### [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

  Put spaces after commas. Don't put spaces before commas.

  ```js
  // bad
  var foo = 1 ,bar = 2;
  var arr = [1 , 2];
  var obj = {foo: bar ,baz: qur};
  foo(a ,b);
  new Foo(a ,b);
  function foo(a ,b){}
  a ,b

  // good
  var foo = 1, bar = 2
      , baz = 3;
  var arr = [1, 2];
  var arr = [1,, 3]
  var obj = {foo: bar, baz: qur};
  foo(a, b);
  new Foo(a, b);
  function foo(a, b){}
  a, b
  ```

- ### [`comma-style`](https://eslint.org/docs/rules/comma-style)

  Commas should come after and on the same line as an array element, object property, or variable declaration.

  ```js
  // bad
  var foo = 1
  ,
  bar = 2;

  var foo = 1
    , bar = 2;

  var foo = ['apples'
            , 'oranges'];

  function bar() {
    return {
      a: 1
      ,b: 2
    };
  }

  // good
  var foo = 1, bar = 2;

  var foo = 1,
      bar = 2;

  var foo = ['apples',
            'oranges'];

  function bar() {
    return {
      a: 1,
      b: 2
    };
  }
  ```

- ### [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

  Don't add a space between a function name and the opening parenthesis.

  ```js
  // bad
  fn ();

  fn
  ();

  // good
  fn();
  ```

- ### [`indent`](https://eslint.org/docs/rules/indent)

  _**CONTROVERSAL!!!!!!!!!!**_

  Use 2-space indentation (or 4 spaces if using the four space config), multi-line property chains with 2 spaces, and indentation level for case clauses in `switch` statements.

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

- ### [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

  Use consistent spacing between keys and values in object literals. Use a space after the colon and disallows a space before the colon.

  ```js
  // bad
  var obj = { foo : 42 };
  var obj = { foo:42 };

  // good
  var obj = { foo: 42 };
  ```

- ### [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing)

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

- ### [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing)

  Use a space inside of braces (except `{}`)

  ```js
  // bad
  var obj = {'foo': 'bar'};
  var obj = {'foo': 'bar' };
  var obj = { baz: {'foo': 'qux'}, bar};
  var obj = {baz: { 'foo': 'qux' }, bar};
  var obj = {'foo': 'bar'
  };
  var obj = {
    'foo':'bar'};
  var {x} = y;
  import {foo } from 'bar';

  // good
  var obj = {};
  var obj = { 'foo': 'bar' };
  var obj = { 'foo': { 'bar': 'baz' }, 'qux': 'quxx' };
  var obj = {
    'foo': 'bar'
  };
  var { x } = y;
  import { foo } from 'bar';
  ```

- ### [`one-var`](https://eslint.org/docs/rules/one-var)

  Use multiple variable declarations per scope.

  > Why? It simplifies adding and removing variables, since only the lines you are modifying must be touched. It improves the clarity of diffs when a variable is added to a scope.

  ```js
  // bad
  function foo() {
    var bar,
        baz;
    const bar = true,
        baz = false;
  }

  function foo() {
    var bar,
        qux;

    if (baz) {
      qux = true;
    }
  }

  function foo(){
    let bar = true,
        baz = false;
  }

  // good
  function foo() {
    var bar;
    var baz;
  }

  function foo() {
    var bar;

    if (baz) {
      var qux = true;
    }
  }

  function foo() {
    let bar;

    if (baz) {
      let qux = true;
    }
  }
  ```

- ### [`quotes`](https://eslint.org/docs/rules/quotes)

  Use single quotes wherever possible. Use backticks with template literals.

  ```js
  // bad
  var double = double;
  var unescaped = a string containing 'single' quotes;

  // good
  var single = 'single';
  var backtick = `back${x}tick`;
  ```

- ### [`semi`](https://eslint.org/docs/rules/semi)

  Use semicolons at the end of statements.

  > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called Automatic Semicolon Insertion to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

  ```js
  // bad
  var name = 'ESLint'
  let object = {}

  object.method = function() {
    // ...
  }

  // good
  var name = 'ESLint';
  let object = {};

  object.method = function() {
    // ...
  };
  ```

- ### [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren)

  Don't put a space before the `(` of arguments.

  ```js
  // bad
  function foo () {
    // ...
  }

  var bar = function () {
    // ...
  };

  var bar = function foo () {
    // ...
  };

  class Foo {
    constructor () {
      // ...
    }
  }

  var foo = {
    bar () {
      // ...
    }
  };

  var foo = async () => 1

  // good
  function foo() {
    // ...
  }

  var bar = function() {
    // ...
  };

  var bar = function foo() {
    // ...
  };

  class Foo {
    constructor() {
      // ...
    }
  }

  var foo = {
    bar() {
      // ...
    }
  };

  var foo = async() => 1
  ```

- ### [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops)

  Put spaces around infix operators.

  ```js
  // bad
  a+b

  a+ b

  a +b

  a?b:c

  const a={b:1};

  var {a=0}=bar;

  function foo(a=0) { }

  // good
  a + b

  a ? b : c

  const a = {b:1};

  var {a = 0} = bar;

  function foo(a = 0) { }
  ```

- ### [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing)

  Put spaces before and after an arrow function’s arrow.

  ```js
  // bad
  ()=> {};
  () =>{};
  (a)=> {};
  (a) =>{};
  a =>a;
  a=> a;
  ()=> {'\n'};
  () =>{'\n'};

  // good
  () => {};
  (a) => {};
  a => a;
  () => {'\n'};
  ```

- ### [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)

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

- ### [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

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
  class A { }

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

  class A extends B {
    constructor() {
      super();
      doSomething();
    }
  }
  ```

- ### [`no-var`](https://eslint.org/docs/rules/no-var)

  Use `let` or `const` instead of `var`.

  > Why? ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the `let` and `const` keywords.

  ```js
  // bad
  var x = y;
  var CONFIG = {};

  // good
  let x = y;
  const CONFIG = {};
  ```

- ### [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

  Use `const` instead of `let` when a variable is never reassigned.

  > Why? If a variable is never reassigned, using the `const` declaration is better.
  > `const` declaration tells readers, “this variable is never reassigned,” reducing cognitive load and improving maintainability.

  ```js
  // bad
  // it's initialized and never reassigned.
  let a = 3;
  console.log(a);

  let a;
  a = 0;
  console.log(a);

  // `i` is redefined (not reassigned) on each loop step.
  for (let i in [1, 2, 3]) {
    console.log(i);
  }

  // `a` is redefined (not reassigned) on each loop step.
  for (let a of [1, 2, 3]) {
    console.log(a);
  }

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

  // it's initialized at a place that we cannot write a variable declaration.
  let a;
  if (true) a = 0;
  console.log(a);

  // `i` gets a new binding each iteration
  for (const i in [1, 2, 3]) {
    console.log(i);
  }

  // `a` gets a new binding each iteration
  for (const a of [1, 2, 3]) {
    console.log(a);
  }
  ```

- ### [`prefer-template`](https://eslint.org/docs/rules/prefer-template)

  Use template literals instead of string concatenation.

  ```js
  // bad
  var str = Hello,  + name + !;
  var str = Time:  + (12 * 60 * 60 * 1000);

  // good
  var str = Hello World!;
  var str = `Hello, ${name}!`;
  var str = `Time: ${12 * 60 * 60 * 1000}`;
  ```
