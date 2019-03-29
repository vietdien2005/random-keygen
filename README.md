# Random Keygen [![Build Status](https://travis-ci.org/vietdien2005/random-keygen.svg?branch=master)](https://travis-ci.org/vietdien2005/random-keygen)

[![Random-Keygen NPM](https://nodei.co/npm/random-keygen.png?downloads=true&downloadRank=true)](http://npmjs.org/package/random-keygen)

> Simple random key and unique keys.

## Install

```bash
  npm install random-keygen --save
```

## Usage

### `get([options])`

Random one key with the given options. Returns a string.

```javascript
var randkey = require('random-keygen');

var key = randkey.get({
    length: 10,
    numbers: true
});

console.log(key);
```

### `getMulti(amount[, options])`

Bulk create multiple keys at once, with the same options for all. Returns an array.

```javascript
var randkey = require('random-keygen');

var keys = generator.getMulti(3, {
    length: 10,
    uppercase: false
});

console.log(keys);
```

## Options

Any of these can be passed into the options object for each function.

|            Name          |                  Description                        | Default Value |
|--------------------------|-----------------------------------------------------|---------------|
| length                   | Integer, length of key.                        |       10      |
| numbers                  | Boolean, put numbers in key.                   |     false     |
| symbols                  | Boolean, put symbols in key.                   |     false     |
| uppercase                | Boolean, use uppercase letters in key.         |      true     |
| excludeSimilarCharacters | Boolean, exclude similar chars, like 'i' and 'l'.   |     false     |
| exclude                  | String, characters to be excluded from key.    |       ''      |
| strict                   | Boolean, key must include at least one character from each pool. |     false     |
