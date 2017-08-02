const fixtureSimple = require('../fixture/simple.json');
const { expect } = require('chai');
const subject = require('../../');

describe('lib/parser', () => {
	context('given simple queries', () => {
		fixtureSimple.forEach(({ desc, input, output }) => {
			it(desc, () => {
				const result = subject(input);
				expect(result).to.deep.equal(output);
			});
		});
	});
});
