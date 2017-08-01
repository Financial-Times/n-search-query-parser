module.exports = (str) => (
	str.replace(/^\(/, '').replace(/\)$/, '')
);
