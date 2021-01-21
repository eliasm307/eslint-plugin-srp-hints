/**
 * Function to create text for a basic named function from variables
 * @param  {string} name Name of the function
 * @param  {string[]} [args[]] (Optional) Arguments of the function as a string array of arg variable names
 * @param  {string} [body] (Optional) Text that represents the inner body text of the function
 * @returns {string} text representing a basic named JS function
 */
function createFunctionText(format, name, args, body) {
	if (typeof format !== 'string')
		return new Error(
			`Function format is not a string, it is a '${typeof name}' with value '${name}', in file:\n${__filename}`
		);

	const nameText = name && typeof name === 'string' ? name : 'genericName';
	const argsText = args && typeof args === 'object' && typeof args.length === 'number' ? args.join(', ') : '';
	const bodyText = body && typeof body === 'string' ? `${body.trim()}` : ' ';

	const nameRegEx = new RegExp(`{{[ ]*name[ ]*}}`, 'g');
	const argsRegEx = new RegExp(`{{[ ]*args[ ]*}}`, 'g');
	const bodyRegEx = new RegExp(`{{[ ]*body[ ]*}}`, 'g');

  // replace format placeholders with the actual function text
	const functionText = format
		.replace(nameRegEx, nameText)
		.replace(argsRegEx, argsText)
		.replace(bodyRegEx, /\n/.test(bodyText) ? `\n${bodyText}\n` : ` ${bodyText} `); // if it is a single line then show it inline

	return `\n${functionText}\n`;
}

module.exports = createFunctionText;
