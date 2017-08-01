module.exports = (regexp) => (
	(str) => regexp.exec(str).pop()
);
