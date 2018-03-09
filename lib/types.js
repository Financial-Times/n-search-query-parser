const snip = require('./helpers/snip-group');
const capture = require('./helpers/capture-match');

const types = {
	GROUP: 'group',
	PHRASE: 'phrase',
	OPERATOR: 'operator',
	WORD: 'word',
	WHITESPACE: 'whitespace',
	UNKNOWN: 'unknown'
};

// Regexps with capturing groups can be reused by the tokenizer.
// Always anchor the pattern regexps to the left side.
const patterns = {
	// This regexp has no capturing group because a JS regexp cannot
	// keep track of the number of braces open/closed.
	[types.GROUP]: /^\([^)]+\)/,

	[types.PHRASE]: /^("[^"]+")/,

	[types.OPERATOR]: /^(AND|OR|NOT)/,

	[types.WORD]: /^([^\s]+)/,

	[types.WHITESPACE]: /^(\s+)/
};

const tokenizers = {
	[types.PHRASE]: capture(patterns[types.PHRASE]),

	// Regexps are the wrong tool to match outer braces
	[types.GROUP]: (str) => snip(str),

	[types.OPERATOR]: capture(patterns[types.OPERATOR]),

	[types.WORD]: capture(patterns[types.WORD]),

	[types.WHITESPACE]: capture(patterns[types.WHITESPACE]),

	[types.UNKNOWN]: () => '�'
};

module.exports = { types, patterns, tokenizers };
