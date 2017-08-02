const tokenizer = require('./tokenizer');
const builder = require('./builder');

module.exports = (query) => {
	const tokens = tokenizer(query);
	return builder(tokens);
};
