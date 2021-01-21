/**
 * @fileoverview This rule defines whether a descriptive comment must appear at the top of functions depending on their length
 * @author Elias Mangoro
 */

'use strict';

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const getFunctionLineCount = require('../../utils/getFunctionLineCount');
const formatComment = require('../../utils/formatComment');
const meta = require('./meta');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta,
	create: function (context) {
		// constants
		const sourceCode = context.getSourceCode();
		const option = context.options[0];

		// define option defaults
		let minLines = 30;
		let descriptionPrefix = "This function's responsibility is";
		let minDescriptionContentLength = 10;

		// use option values if they have been defined
		if (typeof option === 'object') {
			// if options are defined as an object
			if (typeof option.minLines === 'number') minLines = option.minLines;
			if (typeof option.minDescriptionContentLength === 'number')
				minDescriptionContentLength = option.minDescriptionContentLength;
			if (typeof option.descriptionPrefix === 'string') descriptionPrefix = option.descriptionPrefix;
		} else if (typeof option === 'number') {
			// if options is defined as a single number, this relates to the minLines before a comment is required
			minLines = option;
		}

		// make sure prefix is in a format that can be compared with multiline jsdoc comment
		descriptionPrefix = formatComment(descriptionPrefix);

		function processFunction(funcNode) {
			// ignore functions without an id
			const functionName = funcNode.id && funcNode.id.name;
			const jsDocComment = sourceCode.getJSDocComment(funcNode);
			const parentVariableName = funcNode.parent.type === 'VariableDeclarator' && funcNode.parent.id.name;
			const functionVariableDeclarationNode = parentVariableName ? funcNode.parent.parent : funcNode; // todo improve this to confirm it is a VariableDeclaration
			const lineCount = getFunctionLineCount(funcNode, sourceCode);

			// ignore if it is an anonymous function not directly tied to a variable
			if (!functionName && !parentVariableName) return;

			// ignore if it is below the min line count limit to require a description
			if (lineCount < minLines) return;

			// set the data availaible when reporting
			const contextData = {
				descriptionPrefix,
				functionName: functionName || parentVariableName,
				minDescriptionContentLength,
				minLines,
			};

			// get formatted jsDocComment
			const jsDocCommentValue = jsDocComment && formatComment(jsDocComment.value);
			const descriptionPrefixRegEx = jsDocComment && new RegExp('^' + descriptionPrefix);
			// remove prefix and any non-word characters to get the raw content characters
			const descriptionContent = jsDocComment && jsDocCommentValue.replace(descriptionPrefixRegEx, '');
			// const descriptionContentCharacters = jsDocComment && descriptionContent.replace(/\W/g, '');
			const descriptionContentCharacterCount = jsDocComment && (descriptionContent.match(/\w/g) || []).length;

			// ! remove, only for debug
			const showLog = () => console.log("LOG BEFORE REPORT",
				{ functionName: functionName || parentVariableName },
				{ minLines },
				{ lineCount },
				{ jsDocCommentValue }
				// { contextData }
			);

			// if a jsDocComment has not been defined for this function then report it
			if (jsDocComment === null) {
				showLog();
				// the auto fixer adds a comment in JsDoc format with the required prefix, above the function declaration
				const fix = fixer =>
					fixer.insertTextBeforeRange(functionVariableDeclarationNode.range, `/** ${descriptionPrefix} ...*/\n`);
				return context.report({
					node: funcNode,
					messageId: 'errorRequireDescription',
					data: contextData,
					suggest: [
						{
							messageId: 'suggestAddNewDescriptionComment',
							data: contextData,
							fix,
						},
					],
				});
			}
			// check if entire comment is empty
			if (jsDocCommentValue === '') {
				// the auto fixer adds a comment in JsDoc format with the required prefix, above the function declaration
				const fix = fixer => fixer.replaceText(jsDocComment, `/** ${descriptionPrefix} ...*/`);
				return context.report({
					node: funcNode,
					messageId: `errorEmptyDescription`,
					data: contextData,
					suggest: [
						{
							messageId: 'suggestAddPrefixToEmptyDescriptionComment',
							data: contextData,
							fix,
						},
					],
				});
			}
			// check description starts with required prefix
			if (!jsDocCommentValue.startsWith(descriptionPrefix)) {
				return context.report({
					node: funcNode,
					messageId: `errorDescriptionMissingPrefix`,
					data: contextData,
				});
			}
			// ! remove, only for debugging
			/*
			console.log({
				descriptionContentCharacters,
				descriptionContentLength: descriptionContentCharacters.length,
				descriptionPrefixRegEx,
				descriptionContent,
				descriptionContentCharacterCount,
			});*/
			// check if there is no content text exists after prefix
			if (descriptionContentCharacterCount === 0) {
				return context.report({
					node: funcNode,
					messageId: `errorDescriptionMissingContentAfterPrefix`,
					data: contextData,
				});
			}
			// check minimum amount of text exists after prefix
			if (descriptionContentCharacterCount < minDescriptionContentLength) {
				return context.report({
					node: funcNode,
					messageId: `errorDescriptionContentAfterPrefixTooShort`,
					data: contextData,
				});
			}
		}

		return {
			FunctionDeclaration: processFunction,
			FunctionExpression: processFunction,
			ArrowFunctionExpression: processFunction,
		};
	},
};
