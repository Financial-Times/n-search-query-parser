const snipGroup = require('./helpers/snip-group');
const captureMatch = require('./helpers/capture-match');

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
	// This regexp has no capturing group because a regexp cannot use
	// keep track of the number of braces open/closed.
	[types.GROUP]: /^\([^)]+\)/,

	[types.PHRASE]: /^("[^"]+")/,

	[types.OPERATOR]: /^(AND|OR|NOT)/,

	[types.WORD]: /^([^\s\(\)]+)/,

	[types.WHITESPACE]: /^(\s+)/
};

const tokenizers = {
	[types.PHRASE]: captureMatch(patterns[types.PHRASE]),

	// regexps are the wrong tool to match outer braces
	[types.GROUP]: (str) => snipGroup(str, '(', ')'),

	[types.OPERATOR]: captureMatch(patterns[types.OPERATOR]),

	[types.WORD]: captureMatch(patterns[types.WORD]),

	[types.WHITESPACE]: captureMatch(patterns[types.WHITESPACE]),

	[types.UNKNOWN]: () => '�'
};

module.exports = { types, patterns, tokenizers };
