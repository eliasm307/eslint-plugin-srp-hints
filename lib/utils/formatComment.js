/**
 * Formats a raw comment so it can be compared directly with other formatted comments or strings
 * @param {string} comment A raw comment string
 * @returns {string} A formatted comment string without any new lines or JsDoc prefix
 */
function formatComment(comment) {
	return comment
		.replace(/^\*/, '') // remove '*' at the start
		.replace(/(?:\r\n|\r|\n)/g, ' ') // replace all new lines with a space
		.trim();
};

module.exports = formatComment;
 
