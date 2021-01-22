const defaultOptions = require('../defaultOptions');

console.log(__filename, { defaultOptions });

module.exports = {
	extends: [],
	plugins: ['srp-hints'],
	rules: {
		'max-lines-per-function': [
			'warn',
			{
				max: 50,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true,
			},
		],
		'max-lines': [
			'warn',
			{
				max: 100,
				skipBlankLines: true,
				skipComments: true,
			},
		],
		complexity: ['warn', { max: 4 }],
		'max-nested-callbacks': ['warn', { max: 3 }],
		'max-depth': ['warn', { max: 4 }],
		'max-statements': ['warn', 15, { ignoreTopLevelFunctions: true }],
		'srp-hints/function-description': ['warn', defaultOptions['function-description']],
	},
};
