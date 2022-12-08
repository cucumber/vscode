# Releasing

## Do a manual test:

Before a release it is important to do a manual test.
We haven't invested in automated tests to catch regressions.

    npm install
    code .

Run the extension (opens a new window) and check all the functionality such as:

* Syntax highlighting
* Auto-complete
* Formatting

## GitHub Actions release

See [.github/RELEASING](https://github.com/cucumber/.github/blob/main/RELEASING.md).

*IMPORTANT:* After updating dependencies, revert both `engines.vscode` and `"@types/vscode"` to the *same* version.

Use a version that is 2 *minor* versions behind the latest version so that the extension doesn't require the latest version of VS Code.
