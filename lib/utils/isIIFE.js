/**
 * Identifies if a node is a FunctionExpression which is part of an IIFE
 * @param {ASTNode} node Node to test
 * @returns {boolean} True if it's an IIFE
 */
function isIIFE(node) {
	return (
		(node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') &&
		node.parent &&
		node.parent.type === 'CallExpression' &&
		node.parent.callee === node
	);
}

module.exports = isIIFE;
