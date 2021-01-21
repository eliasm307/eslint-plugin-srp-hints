// define default test options
const defaultTestOptions = {
	minLines: 50,
	descriptionPrefix: "This function's responsibility is",
	minDescriptionContentLength: 10,
};

// default test data extend default test options
const defaultTestData = {
	...defaultTestOptions,
	functionName: 'name',
};

// create standalone variables for some data to make references to them shorter
const defaultDescriptionPrefix = defaultTestOptions.descriptionPrefix;
const defaultFunctionName = defaultTestData.functionName;

module.exports = { defaultTestOptions, defaultTestData, defaultDescriptionPrefix, defaultFunctionName };
