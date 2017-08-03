const tokenize = require('./tokenizer');
const build = require('./builder');

function parse (query) {
	const tokens = tokenize(query);
	return build(tokens);
}

module.exports = { tokenize, build, parse };
