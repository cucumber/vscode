#!/usr/bin/env bash
# This script updates the docs for the configuration properties.
# It extracts sections from the README.md and writes them into the markdownDescription
# fields in `package.json`.

function section {
  file=$1
  setting=$2
  sed -n "/\[\/\/\]: # (<${setting}>)/,/\[\/\/\]: # (<\/${setting}>)/p" "${file}" | tail -n +2 | sed -e '$ d'
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
  setting=$1
  markdown=$(section 'README.md' "${setting}")
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"${setting}\".markdownDescription" \
    "${markdown}" \
    0

  default=$(echo "${markdown}" | sed -n "/^\`\`\`json$/,/^\`\`\`$/p" | tail -n +2 | sed -e '$ d' | jq ".\"${setting}\"")
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"${setting}\".default" \
    "${default}" \
    1
}

updateMarkdownDescription "cucumber.features"
updateMarkdownDescription "cucumber.glue"
updateMarkdownDescription "cucumber.parameterTypes"
