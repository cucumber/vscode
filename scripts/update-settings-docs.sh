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
  variable=$2
  value=$3
  json=$4

  if [ "${json}" = 1 ]; then
    json=$(jq --argjson value "${value}" "${variable} = \$value" "${file}")
  else
    json=$(jq --arg value "${value}" "${variable} = \$value" "${file}")
  fi
  echo "${json}" > "${file}"
}

function updateMarkdownDescription {
  marker=$1
  markdown=$(section 'README.md' "${marker}")
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"cucumber.${marker}\".markdownDescription" \
    "${markdown}" \
    0

  default=$(echo "${markdown}" | sed -n "/^\`\`\`json$/,/^\`\`\`$/p" | tail -n +2 | sed -e '$ d')
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"cucumber.${marker}\".default" \
    "${default}" \
    1
}

updateMarkdownDescription "features"
updateMarkdownDescription "glue"
updateMarkdownDescription "parameterTypes"
