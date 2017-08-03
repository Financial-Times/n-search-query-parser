const { expect } = require('chai');
const subject = require('../../lib/tokenizer');

const fixtureSimple = require('../fixture/simple.json');
const fixtureInvalid = require('../fixture/invalid.json');

describe('lib/tokenizer', () => {
	context('given simple queries', () => {
		fixtureSimple.forEach(({ desc, query, tokens }) => {
			it(desc, () => {
				const result = subject(query);
				expect(result).to.deep.equal(tokens);
			});
		});
	});

	context('given invalid queries', () => {
		fixtureInvalid.forEach(({ desc, query, tokens }) => {
			it(desc, () => {
				const result = subject(query);
				expect(result).to.deep.equal(tokens);
			});
		});
	});
});
