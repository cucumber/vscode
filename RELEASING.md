# Releasing

This document describes how to make a release using GitHub Actions.

## Upgrade dependencies

First, update `package.json`:

    npx npm-check-updates --upgrade

After upgrading dependencies, *undo* the upgrading of `@types/vscode` and revert it to `^1.63.2`.
This is because we don't want to force users to have the latest version of vscode.

Install new dependencies:

    npm install

Test that it still works:

    npm test

Do a manual test:

    code .

Run the extension (opens a new window) and check:
* Syntax highlighting
* Auto-complete
* Formatting
