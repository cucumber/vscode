#!/usr/bin/env bash
# This script updates the docs for the configuration properties.
# It extracts sections from the README.md and writes them into the markdownDescription
# fields in `package.json`.

function section {
  file=$1
  marker=$2
  sed -n "/\[\/\/\]: # (<${marker}>)/,/\[\/\/\]: # (<\/${marker}>)/p" "${file}" | tail -n +2 | sed -e '$ d'
}

function jsonReplace {
  file=$1
  path=$2
  value=$3

  json=$(jq --arg value "${value}" "${path} = \$value" "${file}")
  echo "${json}" > "${file}"
}

function updateMarkdownDescription {
  marker=$1
  markdown=$(section 'README.md' "${marker}")
  path=".contributes.configuration.properties.\"cucumber.${marker}\".markdownDescription"
  jsonReplace 'package.json' "${path}" "${markdown}"
}

updateMarkdownDescription "features"
updateMarkdownDescription "glue"
updateMarkdownDescription "parameterTypes"
