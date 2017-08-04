const { types } = require('./types');

function builder (tokens) {
	const tree = { left: null, operator: '<implicit>', right: null };

	const lhs = tokens[0];
	const rhs = tokens[1];

	let flag;
	let group;

	if (lhs.type === types.WORD || lhs.type === types.PHRASE) {
		tree.left = lhs;
	}

	if (lhs.type === types.GROUP) {
		group = tree.left = builder(lhs.children);
	}

	if (rhs && rhs.type === types.OPERATOR) {
		flag = tree.operator = rhs.text;
	}

	const next = tokens.slice(flag ? 2 : 1);

	if (next.length) {
		tree.right = builder(next);
	} else {
		return group ? { left: tree.left } : tree.left;
	}

	return tree;
}

module.exports = builder;
