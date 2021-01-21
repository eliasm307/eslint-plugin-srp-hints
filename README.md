# eslint-plugin-require-comment

ESLint plugin to require comments at the top of functions depending on length

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-require-comment`:

```bash
npm install eslint-plugin-require-comment --save-dev
```

## Usage

Add `require-comment` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["require-comment"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
		"require-comment/function-description": 2
	}
}
```

## Supported Rules

- [function-description]()
