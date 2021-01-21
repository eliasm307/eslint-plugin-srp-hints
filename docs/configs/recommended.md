# eslint-config-srp-hints

// todo tweak this documentation

[![NPM version](https://img.shields.io/npm/v/eslint-config-srp-hints.svg?style=flat-square)](https://www.npmjs.org/package/eslint-config-srp-hints)

This ESLint Config aims to offer hints for whether there might be an issue regarding the Single Responsibility Princible of SOLID software development.

**NOTE**: This config is in development and rules might be modified or added over time to better meet the overall goal.

## 1) Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm install eslint --save-dev
```

Next, install `eslint-config-srp-hints`:

```bash
npm install eslint-config-srp-hints --save-dev
```

## 2) Usage

Add `srp-hints` to the extends section of your `.eslintrc*` configuration file. You can omit the `eslint-config-` prefix:

```json
{
  "extends": ["srp-hints"]
}
```

## 3) Currently Configured Rules

All rules produce warning by default, as they are merely hints.

### 3.1 **[max-lines-per-function](https://eslint.org/docs/rules/max-lines-per-function)**

Sets a threshold on the number of lines in a function to provide a hint that it is "doing too much".

### 3.2 **[max-statements](https://eslint.org/docs/rules/max-statements#enforce-a-maximum-number-of-statements-allowed-in-function-blocks-max-statements)**

Sets a threshold on the number of separate statements in a function to provide a hint that it is "doing too much".

### 3.3 **[compexity](https://eslint.org/docs/rules/complexity#limit-cyclomatic-complexity-complexity)**

Sets a threshold on the number of return paths a function has to provide a hint that the function might need to be split up into smaller ones.

### 3.4 **[max-nested-callbacks](https://eslint.org/docs/rules/max-nested-callbacks#enforce-a-maximum-depth-that-callbacks-can-be-nested-max-nested-callbacks)**

Sets a threshold on the depth a single chain of callbacks can go to provide a hint that too much is happening in the same place (and that you are also in callback hell).

### 3.5 **[max-depth](https://eslint.org/docs/rules/max-depth#enforce-a-maximum-depth-that-blocks-can-be-nested-max-depth)**

Sets a threshold on the depth you can go nesting code blocks to provide a hint that too much is happening in the same place.

### 4.1 **[require-comment/function-description](https://github.com/eliasm307/eslint-plugin-require-comment/blob/main/docs/rules/function-description.md)**

The aim of this rule is to require that long functions need to have a descriptive JsDoc comment with a certain prefix to define the function's intended responsibility (e.g. "This function's responsibility is to...").

By writing the responsibility of the function into words, the intention is to make it easier to provide hints whether the function's purpose is too broad and also when a function is going beyond its purpose.

## 4 Rules to be Added

The rules below outline some of the goals for future development of this configuration.

### 4.1 require-directive-comment-description

The aim of this rule would be to require that any ESLint directive disabling rules that this config uses, include a comment with justification. This is to ensure that the disabling of these rules is due to a good reason and not just taking the easy way out.
