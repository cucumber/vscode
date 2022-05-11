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

*IMPORTANT:* After updating dependencies, revert to `"@types/vscode": "1.67.0"` so the
extension doesn't require the latest version of VS Code.

*IMPORTANT*: To trigger the release you have to create a tag:

    git commit -am "Release $next_release" && \
    git tag "v$next_release" && \
    git push --tags origin main:release/v$next_release && \
    git push