const fixtureSimple = require('../fixture/simple.json');
const { expect } = require('chai');
const subject = require('../../lib/tokenizer');

describe('lib/tokenizer', () => {
	context('given simple queries', () => {
		fixtureSimple.forEach(({ desc, input, tokens }) => {
			it(desc, () => {
				const result = subject(input);
				expect(result).to.deep.equal(tokens);
			});
		});
	});
});
