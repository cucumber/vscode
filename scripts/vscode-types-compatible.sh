#!/bin/bash
# This script updates the docs for the configuration properties.
# It extracts sections from the README.md and writes them into the markdownDescription
# fields in `package.json`.

# Parse package.json and get the versions of the two packages
vscodeVersion=$(jq -r '.engines.vscode' package.json)
vscodeSemanticVersion=$(echo $vscodeVersion | sed 's/\^//g')
vscodeTypesVersion=$(jq -r '.devDependencies["@types/vscode"]' package.json)

# Compare the versions
if [ "$vscodeTypesVersion" != "$vscodeSemanticVersion" ]; then
  echo "The @types/vscode package version ($vscodeTypesVersion) does not match the VSCode compatibility engine version ($vscodeSemanticVersion). Please update @types/vscode to match."
  exit 1
else
  echo "The @types/vscode package version ($vscodeTypesVersion) matches the VSCode compatibility engine version ($vscodeSemanticVersion)."
  exit 0
fi
