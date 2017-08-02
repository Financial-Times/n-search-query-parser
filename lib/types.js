const XRegExp = require('xregexp');
const snipGroup = require('./helpers/snip-group');
const captureMatch = require('./helpers/capture-match');

const types = {
	GROUP: 'group',
	PHRASE: 'phrase',
	OPERATOR: 'operator',
	PUNCTUATION: 'punctuation',
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

	[types.PUNCTUATION]: XRegExp('^(\\p{Punctuation})'),

	[types.WORD]: XRegExp('^([^\\p{Space_Separator}]+)'),

	[types.WHITESPACE]: /^(\s+)/
};

const tokenizers = {
	[types.PHRASE]: captureMatch(patterns[types.PHRASE]),

	// regexps are the wrong tool to match outer braces
	[types.GROUP]: (str) => snipGroup(str),

	[types.OPERATOR]: captureMatch(patterns[types.OPERATOR]),

	[types.PUNCTUATION]: (str) => str.substr(0, 1),

	[types.WORD]: captureMatch(patterns[types.WORD]),

	[types.WHITESPACE]: captureMatch(patterns[types.WHITESPACE]),

	[types.UNKNOWN]: () => '�'
};

module.exports = { types, patterns, tokenizers };
