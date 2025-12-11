#!/bin/bash

set -euo pipefail

cd language-server
npm run build
cd ..
cd language-service
npm run build
cd ..

