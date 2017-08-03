const { expect } = require('chai');
const subject = require('../../lib/builder');

const fixtureSimple = require('../fixture/simple.json');
const fixtureInvalid = require('../fixture/invalid.json');

describe('lib/builder', () => {
	context('given simple queries', () => {
		fixtureSimple.forEach(({ desc, tokens, tree }) => {
			it(desc, () => {
				const result = subject(tokens);
				expect(result).to.deep.equal(tree);
			});
		});
	});

	context('given invalid queries', () => {
		fixtureInvalid.forEach(({ desc, tokens, tree }) => {
			it(desc, () => {
				const result = subject(tokens);
				expect(result).to.deep.equal(tree);
			});
		});
	});
});
