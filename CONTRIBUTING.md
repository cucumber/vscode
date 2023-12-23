# Contributing

Welcome! We're happy to have you here. Thank you for your interest in contributing to the [Cucumber Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official).

## Code of Conduct

We want to create a welcoming environment for everyone who is interested in contributing. Visit our [Code of Conduct page](https://github.com/cucumber/common/blob/main/CODE_OF_CONDUCT.md) to learn more about our commitment to an open and welcoming environment.

## Get Started

### Reporting Issues

Create a new issue from the "[Bug report](https://github.com/cucumber/vscode/issues/new?assignees=&labels=%3Abug%3A+bug&projects=&template=bug_report.md&title=)" template and follow the instructions.

### Proposing Features

Create a new issue from the "[Feature request](https://github.com/cucumber/vscode/issues/new?assignees=&labels=%3Azap%3A+enhancement&projects=&template=feature_request.md&title=)" template and follow the instructions.

### Running the Extension

The following information will help you run the extension locally.

1. Open the repository in Visual Studio Code.
2. Ensure that the [Cucumber extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official) is disabled in case you have installed it from the marketplace.
3. Run `npm install`.
4. Press `F5` to open a new window with your extension loaded.
5. Open a `.feature` file.
6. Find output from the extension in the debug console under `Output -> Cucumber Language Server`.
7. Set breakpoints within code in the `src` directory to debug the extension.

    ![Visual Studio Code Output](https://raw.githubusercontent.com/cucumber/vscode/main/doc/contributing/vscode-output.png)

## Modifying the LSP

Most of the logic in this extension is implemented in the [Cucumber Language Server](https://github.com/cucumber/language-server) and the underlying [Cucumber Language Service](https://github.com/cucumber/language-service).

The instructions below demonstrate how you can run changes made to either of these libraries within the extension. They should be executed in a container to isolate changes and avoid linking issues. The steps assume the commands are run from within this repository and that the libraries and the extension have been cloned to the same parent directory. If your work involves modifying the language service, please note that a [Docker installation is required](https://github.com/cucumber/language-service/blob/main/CONTRIBUTING.md#prerequisites).

```console
pushd ../language-service
npm install
npm link
npm run build
popd

pushd ../language-server
npm install
npm link @cucumber/language-service
npm link
npm run build
popd

npm install
npm link @cucumber/language-server
code .
```

Press `F5` to run the extension as before.

### Rebuilding

If you need to make further changes to the libraries, you have to rebuild them (but relinking is not necessary). For example:

```console
pushd ../language-service
npm run build
popd
```

The changes can be loaded in two ways.

* Relaunch the extension from the debug toolbar.
* Reload (`Ctrl+R` or `Cmd+R` on Mac) the Visual Studio Code window running the extension.

## Preparing Your Pull Request

Before submitting a pull request, please ensure to carry out the following actions.

Format all code to align with project coding standards.

```console
npm run eslint-fix
```

Run the update command for any modifications to [extension settings](README.md#extension-settings) in `README.md`, to ensure they are reflected in `package.json`.

```console
npm run update-settings-docs
```

Update `.vscodeignore` with the paths of any new or modified files or directories that should be included in the packaged version of the extension.

Package the extension locally and ensure the command runs without error - see [Packaging Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions) for more detail.

```console
npm run package
```

[Perform manual testing](RELEASING.md#perform-manual-testing) and verify that the [extension features](README.md#features) are working as expected.

Update the [CHANGELOG](CHANGELOG.md) with any changes that users should be made aware of.

## Resources

The following resources are useful in the development of this extension.

* [Visual Studio Code Extension documentation](https://code.visualstudio.com/api) - Comprehensive documentation covering capabilities, guides and guidelines for Visual Studio Code extensions.
* Type definitions for the Visual Studio Code Extension API release used by this extension can be found within the file `node_modules/@types/vscode/index.d.ts`.
* [Contributing Guidelines for the Cucumber Language Service](https://github.com/cucumber/language-service/blob/main/CONTRIBUTING.md) - Guidance for contributing to the [Cucumber Language Service](https://github.com/cucumber/language-service), the core component responsible for implementing the majority of features in this extension.
