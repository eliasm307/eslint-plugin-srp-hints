# eslint-plugin-srp-hints

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-srp-hints.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-srp-hints)

ESLint plugin to offer hints for whether there might be an issue regarding the Single Responsibility Princible of SOLID software development

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm install eslint --save-dev
```

Next, install `eslint-plugin-srp-hints`:

```bash
npm install eslint-plugin-srp-hints --save-dev
```

## Usage with Recommended Configuration

To use the recommended configuration for this plugin, add `plugin:srp-hints/recommended` to the extends array in the eslintrc file, ie:

```js
{
  extends: [ 'plugin:srp-hints/recommended' ],
}
```

More details for the recommended configuration can be found [here](https://github.com/eliasm307/eslint-plugin-srp-hints/blob/main/docs/configs/recommended.md).

## Usage with Custom Rules

Add `srp-hints` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["srp-hints"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "srp-hints/function-description": 10
  }
}
```

## Supported Rules

- [function-description](https://github.com/eliasm307/eslint-plugin-srp-hints/blob/main/docs/rules/function-description.md)
