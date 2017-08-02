const { types } = require('./types');

function builder (tokens) {
	const tree = { left: null, operator: '<implicit>', right: null };

	const left = tokens.shift();
	const right = tokens[0] || {};

	if (left.type === types.WORD || left.type === types.PHRASE) {
		tree.left = left;
	}

	if (left.type === types.GROUP) {
		tree.left = builder(left.children);
	}

	if (right.type === types.OPERATOR) {
		tree.operator = right.text;
		tokens.shift();
	}

	if (tokens.length) {
		tree.right = builder(tokens);
	} else {
		return left;
	}

	return tree;
}

module.exports = builder;
