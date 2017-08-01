module.exports = (str, left, right) => {
	let i = 0;
	let delimiters = 0;

	while (i < str.length) {
		const char = str.charAt(i);

		i++;

		if (char === '(') {
			delimiters++;
		} else if (char === ')') {
			delimiters--;

			if (delimiters === 0) {
				break;
			}
		}
	}

	return str.substr(0, i);
};
