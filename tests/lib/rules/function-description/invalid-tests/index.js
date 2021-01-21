const {
	defaultTestData,
	defaultTestOptions,
	defaultDescriptionPrefix,
	defaultFunctionName,
} = require('../../../constants');
const createFunctionTests = require('../../../utils/createFunctionTests');

const invalid = [
	// Test simple standalone function is recognised, using number option
	...createFunctionTests(
		{ name: defaultFunctionName, args: [], body: '\n  var x = 5;\n  var x = 2;' },
		{
			options: [1], // ! NOTE: not controlled by defaultTestOptions
			errors: [
				{
					messageId: 'errorRequireDescription',
					data: { ...defaultTestData, minLines: 1 },
				},
			],
		}
	),
	// Test simple function assigned to a variable, using number option
	...createFunctionTests(
		{ name: defaultFunctionName, args: ['arg1', 'arg2'], body: '\n  var x = 5;\n  var x = 2;' },
		{
			options: [1], // ! NOTE: not controlled by defaultTestOptions
			errors: [
				{
					messageId: 'errorRequireDescription',
					data: { ...defaultTestData, minLines: 1 },
				},
			],
		}
	),
	// Test simple standalone function is recognised, using object option
	...createFunctionTests(
		{ name: defaultFunctionName, args: ['arg1', 'arg2'], body: '\n  var x = 5;\n  var x = 2;' },
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorRequireDescription',
					data: { ...defaultTestData, minLines: 1 },
				},
			],
		}
	),
	// function equal to minLines limit should throw error
	...createFunctionTests(
		{ name: defaultFunctionName, args: ['arg1', 'arg2'], body: 'var x = 5;' },
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorRequireDescription',
					data: {
						...defaultTestData,
						minLines: 1,
					},
					suggestions: [
						{
							messageId: 'suggestAddNewDescriptionComment',
							data: { ...defaultTestData, minLines: 1 },
							// output: 'var bar;',
						},
					],
				},
			],
		}
	),
	// function with incorrect prefix
	...createFunctionTests(
		{
			textBefore: `\n/** WRONG ${defaultDescriptionPrefix} to be a test */`,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorDescriptionMissingPrefix',
					data: {
						...defaultTestData,
						minLines: 1,
					},
				},
			],
		}
	),
	// function with empty jsDoc comment
	...createFunctionTests(
		{
			textBefore: `/**    */ `,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorEmptyDescription',
					data: {
						...defaultTestData,
						minLines: 2,
					},
					suggestions: [
						{
							messageId: 'suggestAddPrefixToEmptyDescriptionComment',
							data: { ...defaultTestData, minLines: 1 },
							// output: 'var bar;',
						},
					],
				},
			],
		}
	),
	// function with incorrect prefix
	...createFunctionTests(
		{
			textBefore: `\n/** WRONG ${defaultDescriptionPrefix} to be a test */`,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorDescriptionMissingPrefix',
					data: {
						...defaultTestData,
						minLines: 1,
					},
				},
			],
		}
	),
	// function with jsDoc comment and prefix but no content after prefix
	...createFunctionTests(
		{
			textBefore: `\n/**  ${defaultDescriptionPrefix} */`,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorDescriptionMissingContentAfterPrefix',
					data: {
						...defaultTestData,
						minLines: 1,
					},
				},
			],
		}
	),
	// function with jsDoc comment and prefix but no alpha-numeric content after prefix
	...createFunctionTests(
		{
			textBefore: `\n/**  ${defaultDescriptionPrefix}         ...&£($)) */`,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1 }],
			errors: [
				{
					messageId: 'errorDescriptionMissingContentAfterPrefix',
					data: {
						...defaultTestData,
						minLines: 1,
					},
				},
			],
		}
	),
	// function with jsDoc comment and prefix but content below character limit after prefix
	...createFunctionTests(
		{
			textBefore: `\n/**  ${defaultDescriptionPrefix} too short */`,
			name: defaultFunctionName,
			args: ['arg1', 'arg2'],
			body: 'var x = 5;',
		},
		{
			options: [{ ...defaultTestOptions, minLines: 1, minDescriptionContentLength: 10 }],
			errors: [
				{
					messageId: 'errorDescriptionContentAfterPrefixTooShort',
					data: {
						...defaultTestData,
						minLines: 1,
						minDescriptionContentLength: 10,
					},
				},
			],
		}
	),
];

module.exports = invalid;
