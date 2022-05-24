[![build](https://github.com/cucumber/vscode/actions/workflows/build.yaml/badge.svg)](https://github.com/cucumber/vscode/actions/workflows/build.yaml)

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/CucumberOpen.cucumber-official)

# Cucumber for Visual Studio Code

This extension adds support for using Cucumber with Visual Studio Code, powered by the [Cucumber language server](https://github.com/cucumber/language-server#readme).

This extension is maintained by the [Cucumber team](https://github.com/cucumber/).

## Features

- [Autocomplete](#autocomplete) of Gherkin steps
- [Go to step definition](#go-to-step-definition)
- [Go to step definition](#go-to-step-definition)
- [Syntax highlighting](#syntax-highlighting)
- [Formatting](#formatting) (pretty printing)
- Language support
  - C#
  - Java
  - [JavaScript - help needed](https://github.com/cucumber/language-service/issues/42)
  - PHP
  - [Python/Behave - help needed](https://github.com/cucumber/language-service/issues/49)
  - Ruby
  - TypeScript

### Autocomplete

![Autocomplete](images/autocomplete.gif)

When you start typing a step, you will see auto-complete suggestions
based on existing step definitions and Gherkin steps.

The suggestions are more helpful if your step definitions use
[Cucumber Expressions](https://github.com/cucumber/cucumber-expressions#readme)
but you'll also get suggestions if they use Regular Expressions.

### Go to step definition

![Go to step definition](images/goto-step-definition.gif)

You can quickly navigate from a Gherkin step to a step definition.

### Generate step definition

![Generate step definition](images/generate-step-definition.gif)

Generate step definition snippets with a quick fix.

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

If your `.feature` files and step definition files are
in an unconventional file structure, you need to change the
settings to make autocomplete work properly.

### `cucumber.features`
[//]: # (<cucumber.features>)
The `cucumber.features` setting can be used to speciy where the extension
should look for `.feature` files. Changing this will only affect autocompletion.

Default value:

```json
{
  "cucumber.features": [
    "features/**/*.feature",
    "src/test/**/*.feature" 
  ]
}
```
[//]: # (</cucumber.features>)

### `cucumber.glue`
[//]: # (<cucumber.glue>)
The `cucumber.glue` setting can be used to speciy where the extension
should look for source code where step definitions are defined.
Changing this will only affect autocompletion.

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
[//]: # (</cucumber.glue>)

### `cucumber.parameterTypes`
[//]: # (<cucumber.parameterTypes>)
Override the `cucumber.parameterTypes` setting if your Cucumber Expressions
are using [Custom Parameter Types](https://github.com/cucumber/cucumber-expressions#custom-parameter-types) that are defined outside your `cucumber.glue` setting.

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
[//]: # (</cucumber.parameterTypes>)

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/cucumber/vscode/issues).
