# Contributing

Welcome! 👋 We're happy to have you here. Thank you for your interest in contributing to the [Cucumber Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official).

This guide will provide you with the information you need to start making awesome contributions to this project. If you encounter a problem, please reach out for help through our [Slack community](https://cucumber.io/community#slack) or feel free to [open an Issue](https://github.com/cucumber/vscode/issues).

We look forward to supporting your contributions! 💖

## Getting Started

The following steps will help you to get the extension up and running locally - directly from the source code.

1. Open the repository in Visual Studio Code.
2. Ensure that the [Cucumber extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official) is disabled in case you have installed it from the marketplace.
3. Run `npm install` to install the required dependencies.
4. Press `F5` to build and run the extension in a new window.
5. Open a `.feature` file - you should observe gherkin syntax highlighting.
6. Finally, open the Output window to view logs from the extension under `Output -> Cucumber Language Server`.

    ![Visual Studio Code Output](https://raw.githubusercontent.com/cucumber/vscode/main/images/vscode-output.png)

Achievement unlocked! You are now running the extension locally! 🏆

## Modifying the Language Server

Once you have completed [getting started](#getting-started), you may be wondering how you can begin modifying the implementation. 🤔

This extension uses the _Language Server Protocol_ to communicate with Visual Studio Code, which is an open protocol that allows the development of a common implementation - called a __language server__ - that can communicate with different IDEs. This implementation is stored in the [Cucumber Language Server](https://github.com/cucumber/language-server) and the underlying [Cucumber Language Service](https://github.com/cucumber/language-service). Let's integrate local versions of each into our extension so we can modify them.

1. First, clone the Language Server and the Language Service to the same directory in which you cloned the extension. Your directory structure should appear as follows:

    ```console
    directory/
    ├── language-server/
    ├── language-service/
    └── vscode/
    ```

2. At this point, please [download and install docker](https://www.docker.com/products/docker-desktop/) if you have not already done so. A [docker installation is required](https://github.com/cucumber/language-service/blob/main/CONTRIBUTING.md#prerequisites) to build the Language Service.
3. Now for the tricky part - we need to build and link to the packages of the repositories we've just cloned.

    a. Inside the __Language Service__ repository, build and link the package to your global node modules.

    When you run `npm link` in the package directory, npm creates a symlink in the global node modules directory that links to the package. This makes the package appear as if it's globally installed on your system.

    ```console
    npm install
    npm link
    npm run build
    ```

    b. Repeat the same inside the __Language Server__ repository, this time linking back to the Language Service we just built - so the Language Server uses our local version.

    ```console
    npm install
    npm link @cucumber/language-service
    npm link
    npm run build
    ```

    c. Finally, within the __extension__ repository, link back to the Language Server we just built.

    ```console
    npm install
    npm link @cucumber/language-server
    ```

4. Now open the extension repository in Visual Studio Code.
5. As before, press `F5` to build and run the extension in a new window.

Phew! That was tough - but all going well, you did it! 🙌 You can now start modifying the implementation and observe those changes running in Visual Studio Code - awesome! 😎

### Rebuilding

If you need to make further changes to these packages, you have to rebuild them but relinking is not necessary e.g. you only need to run `npm run build` in the Language Service. To load your changes, either reload the window running the extension (`Ctrl+R` or `Cmd+R` on Mac) or relaunch the extension from the debug toolbar in the window that you are developing the extension.

For debugging the extension, set breakpoints within the code. 🐞

### Check everything is working

A nice way to check you are using the local language server implementations is to modify the snippet templates that generate step definitions for undefined steps. You will find these templates assigned to `defaultSnippetTemplate` in each of the ['\<language>Language.ts' files](https://github.com/cucumber/language-service/tree/main/src/language) of the Language Service, where each `<language>` is a programming language in which you can write compatible step definitions. Preferably, use a language you are comfortable with.

Make a small change to a selected snippet - such as adding a comment; rebuild the language service and reload the extension (see [Rebuilding](#rebuilding)). Ensure you have an existing step definition matching extension settings (see [generate step definition](README.md#generate-step-definition)) and a feature file containing an undefined step. Finally, click the `Quick Fix` on the undefined step to generate the step definition. You should see your template changes reflected in the output.

If your changes are not reflected or something went wrong, we would love to know what happened. Please [open an issue](https://github.com/cucumber/vscode/issues) and provide as much detail as possible: versions, operating system, error messages, etc. We will help you resolve the issue. 🤝

## Preparing Your Pull Request

Before submitting a pull request, there are a few actions that we must ensure to carry out.

- Format all code to align with project coding standards.

    ```console
    npm run eslint-fix
    ```

- Run the update command for any modifications to [extension settings](README.md#extension-settings) in `README.md`, to ensure they are reflected in `package.json`.

    ```console
    npm run update-settings-docs
    ```

- Update `.vscodeignore` with the paths of any new or modified files or directories that should be included in the packaged version of the extension.

- Package the extension locally and ensure the command runs without error - see [Packaging Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions) for more detail.

    ```console
    npm run package
    ```

- [Perform manual testing](RELEASING.md#perform-manual-testing) and verify that the [extension features](README.md#features) are working as expected.

- Update the [CHANGELOG](CHANGELOG.md) with any changes that users should be made aware of.

Your pull request should be good to go.

## Resources

The following resources are useful in the development of this extension.

- [Visual Studio Code Extension documentation](https://code.visualstudio.com/api) - Comprehensive documentation covering capabilities, guides and guidelines for Visual Studio Code extensions.
- [Contributing Guidelines for the Cucumber Language Service](https://github.com/cucumber/language-service/blob/main/CONTRIBUTING.md) - Guidance for contributing to the [Cucumber Language Service](https://github.com/cucumber/language-service), the core component responsible for implementing the majority of features in this extension.
- Type definitions for the Visual Studio Code Extension API release used by this extension can be found within the file `node_modules/@types/vscode/index.d.ts`.

## Code of Conduct

We want to create a welcoming environment for everyone who is interested in contributing. Visit our [Code of Conduct page](https://github.com/cucumber/common/blob/main/CODE_OF_CONDUCT.md) to learn more about our commitment to an open and welcoming environment.

## Feedback

Making this extension easier to contribute to is truly important. If you feel the contributing guidelines or infrastructure could be improved, please [create an issue](https://github.com/cucumber/vscode/issues) or raise a pull request - your input is most welcome.
