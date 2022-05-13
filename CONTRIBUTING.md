# Contributing

Thank you for contributing! Please follow these steps to manually test your changes locally.

Most of the logic in this extension is implemented in two other libraries:

* https://github.com/cucumber/language-service
* https://github.com/cucumber/language-server

If your work involves modifying any of these, here is how you can manually test it in VSCode:

```
pushd language-service
npm install
npm link
npm run build
popd

pushd language-server
npm install
npm link @cucumber/language-service
npm link
npm run build
popd

pushd vscode
npm install
npm link @cucumber/language-server

code .
# Make sure you've disabled the Cucumber extension if you installed it from the marketplace
# Chose `Run -> Run without debugging` to open a 2nd editor where you can manually test
```

## Console output

The `connection.console.info` messages printed by the language server are visible under `Output -> Cucumber Language Server`

![VS Code Output](doc/contributing/vscode-output.png)

## Rebuilding

If you need to make more changes to `language-service` or `language-server`, you have to rebuild them (but you don't need to relink). E.g:

```
pushd language-service
npm run build
popd
```

Then exit your 2nd editor and start it again via `Run`
