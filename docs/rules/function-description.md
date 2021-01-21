# This rule defines whether a descriptive comment must appear at the top of functions </br>(require-comment/function-description)

When following the Single Responsibility Principle (SRP) of software development, functions will likely be short as they only do "one thing". This rule uses this effect of SRP to detect if SRP might be violated (ie if functions are too long) and requires the intended responsibility of the function to be written, such that it is clear if the function must be long or if it is doing too much.

This rule requires the function comment to be written in [JsDoc](https://jsdoc.app/tags-description.html) format, which allows the comment to be used by other tools e.g. VS Code intellisense.

## Rule Details

The aim of this rule is to require that long functions need to have a descriptive jsDoc comment with a certain prefix to define the function's intended responsibility (e.g. "_This function's responsibility is to..._").

By writing the responsibility of the function into words, the intention would be to make it easier to provide hints whether the function's purpose is too broad and also when a function is going beyond its purpose.

### Options

This rule has the following options that can be specified using an object:

- `"minLines"` (default `50`) enforces a minimum number of code lines (i.e. not including empty lines or lines with no alpha-numeric characters) in a function before a JsDoc description comment is required.

- `"descriptionPrefix"` (default `"This function's responsibility is"`) when a comment is required for a function, this option allows specifying the required prefix of the comment (if the comments must be consistent), this can be set to an empty string to allow text in any format.

- `"minDescriptionContentLength"` (default `10`) enforces a minimum number of alpha-numeric characters the function comment must have, not including the mandatory prefix (defined in the `"descriptionPrefix"` option). This option is meant to make sure descriptions have sufficient detail.

The default options are applied as an object as below:

```json
"require-comment/function-description": ["warn", {
  "minLines": 50,
  "descriptionPrefix": "This function's responsibility is", "minDescriptionContentLength": 10
  }]
```

Alternatively, you may specify a single integer for the `"minLines"` option, i.e.:

```json
"require-comment/function-description": ["warn", 50]
```

is equivalent to

```json
"require-comment/function-description": ["warn", { "minLines": 50 }]
```

### Code

Examples of **incorrect** code for this rule:

```js
// TODO
```

Examples of **correct** code for this rule:

```js
// TODO
```

## When Not To Use It

You can turn this rule off if you are not concerned with having responsibility description comments for long functions.
