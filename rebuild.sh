#!/bin/bash

set -euo pipefail

cd language-service
npm run build
cd ..
cd language-server
npm run build
cd ..
