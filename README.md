# n-search-parser

This parser is not that smart, but that's OK. You don't need to know about [parsing expression grammar][1] (and subsequently [the tools][2] surrounding it) or anything like that. It's written in sane JavaScript and consists of a tokenizer and tree builder.

## Supported features

- Conjunction operators (`AND`, `OR` and `NOT`)
- Quoted phrases (`"Theresa May"`)
- Grouping with parentheses (`("Theresa May" OR "Boris Johnson)`)

## Installation

```sh
$ npm i -S @financial-times/n-search-parser
```

## Usage

The module will export three methods.

### `tokenize(query)`

Accepts a string and returns an array of tokens.

```js
const parser = require('@financial-times/n-search-parser');
const tokens = parser.tokenize('"Elon Musk" AND (Space-X OR Tesla)');

/* => [
  {
    type: 'phrase',
    text: '"Elon Musk"'
  },
  {
    type: 'operator',
    text: 'AND'
  },
  {
    type: 'group',
    text: '(Space-X OR Tesla)',
    children: [ ... ]
  }
] */
```

### `build(tokens)`

Accepts an array of tokens and returns an object.

```js
parser.build(tokens);

/* => {
  "left": {
    "type": "phrase",
    "text": "\"Elon Musk\""
  },
  "operator": "AND",
  "right": {
    "left": {
      "type": "word",
      "text": "Space-X"
    },
    "operator": "OR",
    "right": {
      "type": "word",
      "text": "Tesla"
    }
  }
} */
```

### `parse(string)`

Combines the `tokenize` and `build` methods. Accepts a string and returns an object.

## Grammar

The parser will return an array of _tokens_. Each token has a `type` property and the raw `text` that it was generated from. The types are:

- **group** is an expression within parentheses.
- **phrase** is a word or series of words within double quotes.
- **operator** is one of `'AND'`, `'OR'` or `'NOT'`.
- **word** is any series of characters up to, but not including a whitespace.

The `group`, `phrase` and `word` tokens may also have an `operand` property which indicates they are on the right-hand side of an `operator`.

## Performance

This module has been benchmarked using one weeks real search data:

```
Benchmark processed 54348 items in 0.503448318 seconds
```

## Inspired by

- [Lucene query parser][3] (NPM module, generated from PEG)
- [Building a search query parser][4] (Article by Tom Ashworth, about search on Twitter)

[1]: https://en.wikipedia.org/wiki/Parsing_expression_grammar
[2]: http://canopy.jcoglan.com/
[3]: https://github.com/thoward/lucene-query-parser.js
[4]: https://tgvashworth.com/2016/06/27/twitter-search-query-parser.html
