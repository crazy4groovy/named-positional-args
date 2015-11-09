# named-positional-args

API support for args as both named and positional.

## Install

`npm install --save named-positional-args`

## Usage

With this util you call your function API either of two ways:

Eg.

```js
makeIntoGold ({c:3, a:1}); //1. named

makeIntoGold (1, undefined, 3); //2. positional
```

You implement this util like:

```js
function makeIntoGold (a, b, c) {
  arguments = namedParams.apply(makeGold, arguments);
  a = arguments[0]; b = arguments[1]; c = arguments[2];
 
  //rest of code...
}
```

even better with [ES6 destructuring](https://babeljs.io/docs/learn-es2015/#destructuring):

```js
function makeIntoGold (a, b, c) {
  [a, b, c] = namedParams.apply(makeGold, arguments);

  //rest of code...
}
```

_Note:_ this is obviously silly to use for functions which only take a single `{}` object param anyways! ;)

_Warning:_ if you compress/mangle your code, this may break it!! (since the function arg names could no longer align as expected).

## Test

`npm test`
