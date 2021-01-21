/**
 * Tells if a comment encompasses the entire line.
 * @param {string} line The source line with a trailing comment
 * @param {number} lineNumber The one-indexed line number this is on
 * @param {ASTNode} comment The comment node in question
 * @returns {boolean} If the comment covers the entire line
 */
function isFullLineComment(line, lineNumber, comment) {
	const start = comment.loc.start;
	const end = comment.loc.end;
	const isFirstTokenOnLine = start.line === lineNumber && !line.slice(0, start.column).trim();
	const isLastTokenOnLine = end.line === lineNumber && !line.slice(end.column).trim();

	return comment && (start.line < lineNumber || isFirstTokenOnLine) && (end.line > lineNumber || isLastTokenOnLine);
}

module.exports = isFullLineComment;
