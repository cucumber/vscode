[![test-javascript](https://github.com/cucumber/vscode/actions/workflows/test.yml/badge.svg)](https://github.com/cucumber/vscode/actions/workflows/test.yml)

# Cucumber for Visual Studio Code

This extension adds support for using Cucumber with Visual Studio Code, powered by the [Cucumber language server](https://github.com/cucumber/language-server#readme).

This extension is maintained by the [Cucumber team](https://github.com/cucumber/).

## Features

- [x] [Auto completion](#auto-completion) of Gherkin steps
- [x] [Syntax highlighting](#syntax-highlighting)
- [x] [Formatting](#formatting) (pretty printing)
- [x] Language support
  - [x] C#
  - [x] Java
  - [ ] [JavaScript - help needed](https://github.com/cucumber/language-service/issues/42)
  - [x] PHP
  - [x] Ruby
  - [x] TypeScript

### Auto completion

![Autocomplete](images/autocomplete.gif)

When you start typing a step, you will see auto-complete suggestions
based on existing step definitions and Gherkin steps.

The suggestions are more helpful if your step definitions use
[Cucumber Expressions](https://github.com/cucumber/cucumber-expressions#readme)
but you'll also get suggestions if they use Regular Expressions.

### Syntax highlighting

![Syntax highlighting](images/syntax-highlighting.gif)

The syntax highlights highlights Gherkin keywords and step parameters.
Undefined steps and syntax errors are underlined.

### Formatting

![Formatting](images/formatting.gif)

When choosing to format a Gherkin document, it will be formatted
using two space indentation. Numeric cells are right-aligned (as in Excel),
and other cells are right-aligned.

## Extension Settings

### `cucumber.features`
[//]: # (<features>)
The `cucumber.features` setting can be used to speciy where the extension
should look for `.feature` files.

Default value:

```json
{
  "cucumber.features": [
    "features/**/*.feature",
    "src/test/**/*.feature" 
  ]
}
```
[//]: # (</features>)

### `cucumber.glue`
[//]: # (<glue>)
The `cucumber.glue` setting can be used to speciy where the extension
should look for source code where step definitions are defined.

Default value:

```json
{
  "cucumber.glue": [
    "features/**/*.php",
    "features/**/*.rb",
    "features/**/*.ts",
    "src/test/**/*.java",
    "*specs*/**/.cs"
  ]
}
```
[//]: # (</glue>)

### `cucumber.parameterTypes`
[//]: # (<parameterTypes>)
The `cucumber.parameterTypes` setting can be used to define [Custom Parameter Types](https://github.com/cucumber/cucumber-expressions#custom-parameter-types) that are not directly visible in the source code.

Default value:

```json
{
  "cucumber.parameterTypes": []
}
```

For example, if you're using the `actor` parameter type from [@cucumber/screenplay](https://github.com/cucumber/screenplay.js#actors) you'll have to declare this in the `parameterTypes` setting:

````json
{
  "cucumber.parameterTypes": [
    { "name": "actor", "regexp": "[A-Z][a-z]+" }
  ]
}
````
[//]: # (</parameterTypes>)

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/cucumber/vscode/issues).