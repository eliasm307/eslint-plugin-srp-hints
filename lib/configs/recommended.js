const defaultOptions = require('../defaultOptions');

module.exports = {
	extends: [],
	plugins: ['srp-hints'],
	rules: {
		'max-lines-per-function': [
			'warn',
			{
				max: 60,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true,
			},
		],
		complexity: ['warn', { max: 4 }],
		'max-nested-callbacks': ['warn', { max: 3 }],
		'max-depth': ['warn', { max: 4 }],
		'max-statements': ['warn', 15, { ignoreTopLevelFunctions: true }],
		'srp-hints/function-description': ['warn', defaultOptions['defaultOptions']],
	},
};
