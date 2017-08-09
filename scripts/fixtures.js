#!/usr/bin/env node

const path = require('path');
const builder = require('../lib/builder');
const tokenizer = require('../lib/tokenizer');

const filename = process.argv.slice(2).pop();

const help = `
What: Generates a JSON fixture
Usage: node scripts/fixtures.js path/to/fixture.json
Warning: Always check the output before committing it!
`;

if (filename) {
	const fixture = require(path.join(process.cwd(), filename));

	const output = fixture.map((item) => {
		const tokens = tokenizer(item.query);
		const tree = builder(tokens);

		return Object.assign(item, { tokens, tree });
	});

	console.log(JSON.stringify(output, null, 4)); // eslint-disable-line no-console
} else {
	console.log(help); // eslint-disable-line no-console
}
