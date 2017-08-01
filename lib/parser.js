const { types, patterns, tokenizers } = require('./types');
const unwrap = require('./helpers/unwrap-group');

// The precedence of token types to process
const TYPES_PIPELINE = [
	types.GROUP,
	types.PHRASE,
	types.OPERATOR,
	types.WORD,
	types.WHITESPACE
];

// Token types to ignore from the output
const TYPES_TO_IGNORE = new Set([ types.WHITESPACE ]);

// Token types to honour operands flags for
const TYPES_WITH_OPERANDS = new Set([ types.GROUP, types.PHRASE, types.WORD ]);

function parser (query) {
	if (typeof query !== 'string') {
		throw TypeError('the query to parse must be a string');
	}

	const tokens = [];

	// This counter will be incremented by the size of each token
	let i = 0;

	// Only one operator flag may defined at a time and will be unset when used
	let flag = null;

	while (i < query.length) {
		const substr = query.substring(i);

		const type = TYPES_PIPELINE.find((type) => patterns[type].test(substr)) || types.UNKNOWN;

		const text = tokenizers[type](substr);

		const token = { type, text };

		// Allow operator flags to be used only once
		if (flag && TYPES_WITH_OPERANDS.has(type)) {
			token.operand = flag;
			flag = null;
		}

		// Flag any new operators, they cannot be overloaded
		if (type === types.OPERATOR) {
			flag = text;
		}

		// Groups are treated as sub-queries so get your recursion on
		// ... but make sure to unwrap the outer braces first!
		if (type === types.GROUP) {
			token.children = parser(unwrap(text));
		}

		if (!TYPES_TO_IGNORE.has(type)) {
			tokens.push(token);
		}

		// This is simply a defense against infinite loops
		i += text ? text.length : 1;
	}

	return tokens;
}

module.exports = parser
