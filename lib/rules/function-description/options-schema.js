const OPTIONS_SCHEMA = {
	type: 'object',
	properties: {
		minLines: {
			type: 'integer',
			minimum: 0,
		},
		minDescriptionContentLength: {
			type: 'integer',
			minimum: 2,
		},
		descriptionPrefix: {
			type: 'string',
		},
	},
	additionalProperties: false, // ! disallowed incase user mistypes property name and it is treated as additional
};

const OPTIONS_OR_INTEGER_SCHEMA = {
	oneOf: [
		OPTIONS_SCHEMA,
		{
			type: 'integer',
			minimum: 0,
		},
	],
};

module.exports = OPTIONS_OR_INTEGER_SCHEMA;