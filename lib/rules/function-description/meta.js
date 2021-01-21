const optionSchema = require('./options-schema');
const messages = require('./messages');

/**
 * rule metadata object
 */
const meta = {
	type: 'suggestion',
	docs: {
		description:
			'This rule defines whether a descriptive comment must appear at the top of functions depending on their length',
		category: 'Best Practices',
		recommended: false,
		url: 'https://github.com/eliasm307/eslint-plugin-require-comment/blob/main/docs/rules/function-description.md',
		suggestion: true,
	},
	fixable: 'code', // null (not fixable) or "code" or "whitespace" (anything not null is the same for now)
	schema: [optionSchema],
	messages,
};

module.exports = meta;
