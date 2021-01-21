const {
	defaultTestData,
	defaultTestOptions,
	defaultDescriptionPrefix,
	defaultFunctionName,
} = require('../../../constants');
const createFunctionTests = require('../../../utils/createFunctionTests');

const valid = [
	// Code with no functions should be always valid
	{
		code: '\nvar x = 5;\nvar x = 2;\n',
		options: [1],
	},
	// function below minLines line limit should be valid
	...createFunctionTests(
		{ name: defaultFunctionName, body: 'var x = 5;' },
		{
			options: [2],
		}
	),
	// function above minLines line limit but with a reasonably sized description should be valid
	...createFunctionTests(
		{
			textBefore: `\n/** ${defaultDescriptionPrefix} to be a test of a good length description */`,
			name: defaultFunctionName,
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 2 }],
		}
	),
	// function with prefix option set to nothing should allow any comment
	...createFunctionTests(
		{
			textBefore: `\n/** you can use any description format like this */`,
			name: defaultFunctionName,
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 2, descriptionPrefix: '' }],
		}
	),
];

module.exports = valid;
