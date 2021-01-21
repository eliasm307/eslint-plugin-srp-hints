const descriptionFormatInstruction =
	'\nThe description must be a JsDoc comment in the following format:' + '\n /** {{ descriptionPrefix }} ... */\n';

const errorMessages = {
	errorRequireDescription:
		"Function '{{ functionName }}' requires a description of its responsibility as it exceeds {{ minLines }} code line(s) long." +
		descriptionFormatInstruction,
	errorEmptyDescription:
		"Function '{{ functionName }}' has an empty description of its responsibility, which needs to be filled in." +
		descriptionFormatInstruction,
	errorDescriptionMissingPrefix:
		"Function '{{ functionName }}' has a description but it is not in the right format." + descriptionFormatInstruction,
	errorDescriptionMissingContentAfterPrefix:
		"Function '{{ functionName }}' has a description with the right prefix but no content after the prefix, " +
		'\nplease some custom detail so the description is more useful.' +
		descriptionFormatInstruction,
	errorDescriptionContentAfterPrefixTooShort:
		"Function '{{ functionName }}' has a description with the right prefix but not enough content after the prefix, " +
		'\nplease some more detail so the description is more useful ' +
		'\n(detail text after prefix should have atleast {{ minDescriptionContentLength }} alpha-numeric characters).' +
		descriptionFormatInstruction,
};

const suggestMessages = {
	suggestAddNewDescriptionComment: 'Add a description comment template',
	suggestAddPrefixToEmptyDescriptionComment: 'Add the required prefix to blank description comment',
};

module.exports = {
	...errorMessages,
	...suggestMessages,
};
