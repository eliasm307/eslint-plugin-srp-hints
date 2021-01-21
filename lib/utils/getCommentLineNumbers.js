/**
 * Given a list of comment nodes, return a map with numeric keys (source code line numbers) and comment token values.
 * @param {Array} comments An array of comment nodes.
 * @returns {Map.<string,Node>} A map with numeric keys (source code line numbers) and comment token values.
 */
function getCommentLineNumbers(comments) {
	const map = new Map();

	comments.forEach(comment => {
		for (let i = comment.loc.start.line; i <= comment.loc.end.line; i++) {
			map.set(i, comment);
		}
	});
	return map;
}

module.exports = getCommentLineNumbers;