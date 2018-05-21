# n-search-parser

[![CircleCI](https://img.shields.io/circleci/project/github/Financial-Times/n-search-parser/master.svg)](https://circleci.com/gh/Financial-Times/n-search-parser) [![NPM version](https://img.shields.io/npm/v/@financial-times/n-search-parser.svg)](https://www.npmjs.com/package/@financial-times/n-search-parser)

This parser is not that smart, but that's OK. You don't need to know about [parsing expression grammar][1] (and subsequently [the tools][2] surrounding it) or anything like that. It's written in sane JavaScript, is very fast, and consists of a tokenizer and an expression tree builder.

## Supported features

- Conjunction operators (`AND`, `OR` and `NOT`)
- Quoted phrases (`"Theresa May"`)
- Grouping with parentheses (`("Theresa May" OR "Boris Johnson")`)

## Installation

```sh
$ npm i -S @financial-times/n-search-parser
```

## Usage

First include the module in your code:

```js
const parser = require('@financial-times/n-search-parser');
```

This module will export three methods...

### `.tokenize(query)`

Accepts a string and returns an array of tokens (see "grammar" below for more details).

```js
const tokens = parser.tokenize('"Elon Musk" AND (Space-X OR Tesla)');

/* => [
  {
    type: 'phrase',
    text: '"Elon Musk"'
    offset: 0,
    length: 11
  },
  {
    type: 'operator',
    text: 'AND',
    offset: 12,
    length: 3
  },
  {
    type: 'group',
    text: '(Space-X OR Tesla)',
    offset: 16,
    length: 18,
    children: [ ... ]
  }
] */
```

### `.build(tokens)`

Accepts an array of tokens and returns an expression tree object (see "grammar" below for more details).

```js
parser.build(tokens);

/* => {
  left: {
    type: 'phrase',
    text: '"Elon Musk"'
  },
  operator: 'AND',
  right: {
    left: {
      left: {
        type: 'word',
        text: 'Space-X'
      },
      operator: 'OR',
      right: {
        type: 'word',
        text: 'Tesla'
      }
    }
  }
} */
```

### `.parse(string)`

Combines the `tokenize` and `build` methods. Accepts a string and returns an expression tree object.

## Grammar

The `tokenize` method will return an array of _tokens_. Each token has a `type` property and the raw `text` that it was generated from. The types are:

- **group** is an expression within parentheses.
- **phrase** is a word or series of words within double quotes.
- **operator** is one of `'AND'`, `'OR'` or `'NOT'`.
- **word** is any series of characters up to, but not including a whitespace.

The `build` method will return an _expression tree_ object. The tree is constructed with tokens and returns a nested structure showing the relationship between left and right operands.

For example, the string `Good morning World!` will generate the following tokens:

```json
[
  {
    "type": "word",
    "text": "Good"
  },
  {
    "type": "word",
    "text": "morning"
  },
  {
    "type": "word",
    "text": "World!"
  }
]
```

These tokens can be used to construct the following expression tree:

```json
{
  "left": {
    "type": "word",
    "text": "Good"
  },
  "operator": "<implicit>",
  "right": {
    "left": {
      "type": "word",
      "text": "morning"
    },
    "operator": "<implicit>",
    "right": {
      "type": "word",
      "text": "World!"
    }
  }
}
```

## Performance

This module has been continuously benchmarked using real search data:

```
Benchmark processed 54348 items in 0.518364711 seconds
```

## Inspired by

- [Lucene query parser][3] (NPM module, generated from PEG)
- [Building a search query parser][4] (Article by Tom Ashworth, about implementing search on Twitter)

[1]: https://en.wikipedia.org/wiki/Parsing_expression_grammar
[2]: http://canopy.jcoglan.com/
[3]: https://github.com/thoward/lucene-query-parser.js
[4]: https://tgvashworth.com/2016/06/27/twitter-search-query-parser.html
