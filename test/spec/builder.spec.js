const fixtureSimple = require('../fixture/simple.json');
const { expect } = require('chai');
const subject = require('../../lib/builder');

describe('lib/builder', () => {
	context('given simple queries', () => {
		fixtureSimple.forEach(({ desc, tokens, tree }) => {
			it(desc, () => {
				const result = subject(tokens);
				expect(result).to.deep.equal(tree);
			});
		});
	});
});
