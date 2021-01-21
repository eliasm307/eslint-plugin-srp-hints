/**
 * @fileoverview This rule defines whether a descriptive comment must appear at the top of functions depending on their length
 * @author Elias Mangoro
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../../lib/rules/function-description');
const RuleTester = require('eslint').RuleTester;
const valid = require('./valid-tests');
const invalid = require('./invalid-tests');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// TODO test if jsdoc comment includes too much sentence joining words e.g. "and"
// TODO test if prefix is the same but there are letter case differences, offer fix to replace with expected letter case format
// TODO add description length to options and add tests for this
// todo split rules into categories

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('function-description', rule, {
	valid,
	invalid,
});
