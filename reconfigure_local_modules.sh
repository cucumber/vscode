#!/bin/bash
set -euo pipefail

cd language-service
npm install
npm link
npm run build
cd ..
cd language-server 
npm install
npm link @cucumber/language-service
npm link
npm run build
cd ..
cd vscode
npm install
npm link @cucumber/language-server
ls -lAh node_modules/@cucumber
