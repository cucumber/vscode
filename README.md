[![build](https://github.com/cucumber/vscode/actions/workflows/build.yaml/badge.svg)](https://github.com/cucumber/vscode/actions/workflows/build.yaml)

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/CucumberOpen.cucumber-official)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/CucumberOpen.cucumber-official)

# Cucumber for Visual Studio Code

This extension adds support for using Cucumber with Visual Studio Code, powered by the [Cucumber Language Server](https://github.com/cucumber/language-server#readme).

This extension is maintained by the [Cucumber team](https://github.com/cucumber/).

# Installation

Get it from the [Open VSX Registry](https://open-vsx.org/extension/CucumberOpen/cucumber-official) or
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official).

## Features

- [Autocomplete](#autocomplete) of Gherkin steps
- [Go to step definition](#go-to-step-definition)
- [Generate step definition](#generate-step-definition)
- [Syntax highlighting](#syntax-highlighting)
- [Formatting](#formatting) (pretty printing)
- Language support
  - C#/SpecFlow
  - [Go/Godog - help needed](https://github.com/cucumber/language-service/issues/72)
  - Java
  - [JavaScript - help needed](https://github.com/cucumber/language-service/issues/42)
  - PHP
  - Python/Behave
  - Ruby
  - [Rust - help needed](https://github.com/cucumber/language-service/issues/82)
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

Generate step definition snippets with a quick fix - `⌘` + `.` (MacOS) or
`Ctrl` + `.` (Windows).

*IMPORTANT*: Generate step definition will only be enabled
if there is at least one existing step definition. This is
so that the extension can determine the programming language
for the step definition, and provide choices for existing files
to add it to.

### Syntax highlighting

![Syntax highlighting](images/syntax-highlighting.gif)

Gherkin keywords and step parameters are highlighted.
Undefined steps and syntax errors are underlined.

### Formatting

![Formatting](images/formatting.gif)

Gherkin documents are formatted using two space indentation. 

Numeric cells are right-aligned (as in Excel). Non-numeric cells are left-aligned.

## Extension Settings

In most cases you shouldn't need to specify any settings
as the extension comes with reasonable defaults. 

If your `.feature` files and step definition files are
in an unconventional file structure, you need to change the
settings to make autocomplete work properly.

### `cucumber.features`
[//]: # (<cucumber.features>)
The `cucumber.features` setting overrides where the extension 
should look for `.feature` files. 

If no feature files are found, [autocomplete](#autocomplete) 
will not work.

Default value:

```json
{
  "cucumber.features": [
    "src/test/**/*.feature",
    "features/**/*.feature",
    "tests/**/*.feature",
    "*specs*/**/.feature"
  ]
}
```
[//]: # (</cucumber.features>)

### `cucumber.glue`
[//]: # (<cucumber.glue>)
The `cucumber.glue` setting overrides where the extension
should look for source code where step definitions and
parameter types are defined.

If no glue files are found, [autocomplete](#autocomplete) 
will not work, and all Gherkin steps will be underlined as 
undefined. [Generate step definition](#generate-step-definition)
will not work either.

Default value:

```json
{
  "cucumber.glue": [
    "src/test/**/*.java",
    "features/**/*.ts",
    "features/**/*.tsx",
    "features/**/*.php",
    "features/**/*.py",
    "tests/**/*.py",
    "features/**/*.rb",
    "*specs*/**/.cs"
  ]
}
```
[//]: # (</cucumber.glue>)

### `cucumber.parameterTypes`
[//]: # (<cucumber.parameterTypes>)
Override the `cucumber.parameterTypes` setting if your Cucumber Expressions
are using [Custom Parameter Types](https://github.com/cucumber/cucumber-expressions#custom-parameter-types) that are defined outside your `cucumber.glue` setting.

Parameter Types in the `cucumber.glue` globs will be picked up automatically.

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


## Tree View

I gave it a try and implemented my tree view example into the cucumber extension. In general it does work well, but there are some unknowns which I don't know by now. All my local tests I did with cucumber cpp in combination with my example (just pull it and build it): https://github.com/ThoSe1990/cucumber_example 
  
Based on this project the tree looks like  this:

![tree example](images/tree_view_example.png)

I just did quick and dirty icons, where you have the cucumber logo in the context menu and inside the tree view passed, failed and unknown features/scenarios.  

There are two buttons on top and a context menu command:
- Refresh -> this just deletes the view and reparses the feature files
- Run -> this runs all tests
- Run (context menu, right click on item) -> this runs a single feature or scenario
  
If you do a left click on a tree item you open the file and jump to the according location of the feature/scenario.

Before executing the tests we need to create a `launch.json` config for cucumber, like this: 
  
```json 
{
    "version": "0.2.0",
    "configurations": [
        {
            "name":"my first example",
            "type":"cucumber",
            "program":"${workspaceFolder}/build/bin/cucumber_example",
            "command": "/usr/local/bin/cucumber"
       }
    ]
}
```

Where:
- `name`: the name of this configuration
- `type`: cucumber -> this refers to the id of the extension
- `program`: the compiled C++ where the steps are implemented (this can be deleted for other languages)
- `command`: the terminal command which is executed (later this can be used to run behave for example ...)
  
I didn't consider multiple launch configs here (there is a TODO tag left in the code). If there is the use case to have multiple configs you can let the user select the apropriate one if there are more.


When I execute the cucumber commmand, I set always `--publish-quiet` and `--format json`, where then I parse the json output to set the corresponding icons in the tree. What I noticed by playing around with behave, that the output and the arguments are different as in my cucumber cpp example. I left a factory where different runners can be implemented. I don't have experience with Cucumber in JavaScript, Java, PHP, etc. and I don't know if there are some differences too. 
  
Since I'm running Cucumber here in the quiet mode, there is no more output to the user, this means: If a Scenario fails, there is no feedback why. Of course there is the error message in the json file, but now there are many ways to visualize it: Another tree here, setting a decorator in the file, adding a output window, etc, etc. 
  
Also I added once all steps to the tree, which makes the scenarios callapsable as the features. For me this felt a bit overwhelming and I removed it. 

In general this is a very nice feature and it does work quite fine. But if you want the test execution and visualization of the results in a own tree view like here, the entire feature needs to be better defined. This prototype is ok, but still (imo) needs more refactoring.

Feel free to pull and play around or take it as reference, but continuing there on my own wont last in a satisfying result.

Hope that help, if you need something from me, feel free to reach out.