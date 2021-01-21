const createFunctionText = require('./createFunctionText');

/**
 * Function to create ESLint test objects of a function in different formats e.g. arrow function, basic function declaration, etc
 * @param  {Object} functionTemplate An object with properties that will be used to create functions ie name, args, and body
 * @param  {string} functionTemplate.textBefore Text before the function
 * @param  {string} functionTemplate.name Name of the function
 * @param  {string[]} [functionTemplate.args[]] (Optional) Arguments of the function as a string array of arg variable names
 * @param  {string} [functionTemplate.body] (Optional) Text that represents the inner body text of the function
 * @param  {Object} eslintTestTemplate An eslint test object with pre-filled data, except for the 'code' property
 * @returns {Object[]} an array of complete ESLint test objects for the same function written  in different formats
 */
function createFunctionTests(functionTemplate, eslintTestTemplate) {
	// todo find out how to create tests for this function, separate to eslint
	// check inputs are valid
	if (!functionTemplate || !eslintTestTemplate) return [];

	const { name, args, body, textBefore } = functionTemplate;

	const functionExpressionFormats = [
		'function {{ name }}({{ args }}){{{ body }}};',
		'const {{ name }} = function({{ args }}){{{ body }}};',
		'const {{ name }} = ({{ args }}) => {{{ body }}};',
	];

	return functionExpressionFormats.map(format => {
		const functionText = createFunctionText(format, name, args, body);
		const eslintTestTemplateCopy = JSON.parse(JSON.stringify(eslintTestTemplate));
		// console.log(__filename, { functionText, eslintTestTemplateCopy });
		return { ...eslintTestTemplateCopy, code: (textBefore || '') + functionText };
	});
}

module.exports = createFunctionTests;
