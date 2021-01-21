
/**
 * @fileoverview ESLint plugin to require comments at the top of functions depending on length
 * @author Elias Mangoro
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex([__dirname, "/rules"].join(''));



