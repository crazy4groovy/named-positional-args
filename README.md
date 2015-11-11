[![Travis](https://img.shields.io/travis/crazy4groovy/named-positional-args.svg)](https://travis-ci.org/crazy4groovy/named-positional-args)

# named-positional-args

API support for arguments as both named and positional.

Depends on [__named-parameters__](https://www.npmjs.com/package/named-parameters) lib for implementing the very helpful `default`, `coerce`, and `require` features to manage API `arguments` data types and values.

## Install

`npm install --save named-positional-args`

## Usage

###### Call your function API either of two ways, example:

```js
makeIntoGold({c:3, a:1});      //1. named

makeIntoGold(1, undefined, 3); //2. positional
```

###### Implementation, example:

```js
var namedPositionalArgs = require('named-positional-args');

function makeIntoGold(a, b, c) {
  arguments = namedPositionalArgs.apply(makeIntoGold, arguments).args();
  a = arguments[0]; b = arguments[1]; c = arguments[2];
 
  //rest of code...
}
```

###### Even better/simpler with [ES6 destructuring](https://babeljs.io/docs/learn-es2015/#destructuring):

```js
function makeIntoGold(a, b, c) {
  [a, b, c] = 
    namedPositionalArgs.apply(makeIntoGold, arguments).args();

  //rest of code...
}
```

```js
function makeIntoGold(a, b, c) {
  [a, b, c] = 
	namedPositionalArgs
    .apply(makeIntoGold, arguments)
    .default('a', 999)
    .coerce('b', 'boolean')
    .require('c', 'positive integer')
    .args();

  //rest of code...
}
```

__Note:__ This is obviously silly to use for functions which only take a single `{}` object param anyways! ;)

__Warning:__ If you compress/mangle your code, this may break it!! (since the function arg names could no longer align as expected).

## API

`.apply(funcName, arguments)` : Starts the argument parsing chain.

`.default()` : see [default](https://www.npmjs.com/package/named-parameters#specifying-default-values)

`.coerce()` : see [coerce](https://www.npmjs.com/package/named-parameters#coercing-types)

`.require()` : see [require](https://www.npmjs.com/package/named-parameters#validating-parameters) (alias: `.demand()`)

`.args()` : Returns an Array akin to `arguments`.

`.opts()` : Returns an Object with `arguments` data as `name:value` pairs. 

## Test

`npm test`
