/**
 * NOTES:
 * - inspiration for getFunctionLineCount method from: https://github.com/eslint/eslint/blob/master/lib/rules/max-lines-per-function.js
 */
const isIIFE = require('./isIIFE');
const getCommentLineNumbers = require('./getCommentLineNumbers');
const isFullLineComment = require('./isFullLineComment');

/**
 * Count the lines in a function defined by an AST node
 * @param {ASTNode} node Function AST node
 * @param {object} sourceCode Source code from rule context
 * @returns {number} count of code lines in function (not including white space or bracket only lines)
 */
function getFunctionLineCount(node, sourceCode) {
	const commentLineNumbers = getCommentLineNumbers(sourceCode.getAllComments());
	const lines = sourceCode.lines;

	// TODO: should embeded functions be allowed?
	// const node = isEmbedded(funcNode) ? funcNode.parent : funcNode;

	// ignore IIFEs
	if (isIIFE(node)) return;

	let lineCount = 0;

	for (let i = node.loc.start.line - 1; i < node.loc.end.line; ++i) {
		const line = lines[i];

		// skip comments in line count
		if (commentLineNumbers.has(i + 1) && isFullLineComment(line, i + 1, commentLineNumbers.get(i + 1))) continue;

		// skip blank lines or lines which are just brackets or semi-colons in line count
		if (line.match(/^[\s{}();]*$/u)) continue;

		lineCount++;
	}
	return lineCount;
}

module.exports = getFunctionLineCount;