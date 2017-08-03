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

// Token types to not allow in pairs
const TYPES_TO_NEGATE = new Set([ types.OPERATOR ]);

function tokenizer (query) {
	if (typeof query !== 'string') {
		throw TypeError('the query to parse must be a string');
	}

	const tokens = [];

	// This counter will be incremented by the size of each token
	let i = 0;

	while (i < query.length) {
		const substr = query.substring(i);

		const type = TYPES_PIPELINE.find((type) => patterns[type].test(substr)) || types.UNKNOWN;

		const text = tokenizers[type](substr);

		const token = { type, text };

		// Groups are treated as sub-queries so get your recursion on
		// ... but make sure to unwrap the outer braces first!
		if (type === types.GROUP) {
			token.children = tokenizer(unwrap(text));
		}

		// If this token overrides the last then remove it
		if (TYPES_TO_NEGATE.has(type)) {
			const last = tokens[tokens.length - 1];

			if (last && last.type === type) {
				tokens.pop();
			}
		}

		if (!TYPES_TO_IGNORE.has(type)) {
			tokens.push(token);
		}

		// This is simply a defense against infinite loops
		i += text ? text.length : 1;
	}

	return tokens;
}

module.exports = tokenizer;
