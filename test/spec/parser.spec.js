const fixtureSimple = require('../fixture/simple.json');
const { expect } = require('chai');
const subject = require('../../');

describe('lib/parser', () => {
	context('given simple queries', () => {
		it('returns an array of tokens', () => {
			fixtureSimple.forEach(({ input, output }) => {
				const result = subject(input);
				expect(result).to.deep.equal(output);
			});
		});
	});
});
