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

  original=$(cat "${file}")

  if [ "${json}" = 1 ]; then
    json=$(jq --argjson value "${value}" "${variable} = \$value" "${file}")
  else
    json=$(jq --arg value "${value}" "${variable} = \$value" "${file}")
  fi

  # Compare the original and updated contents
  if [ "${json}" != "${original}" ]; then
    echo "${json}" > "${file}"
    return 1
  else
    return 0
  fi
}

function updateMarkdownDescription {
  setting=$1
  markdown=$(section 'README.md' "${setting}")
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"${setting}\".markdownDescription" \
    "${markdown}" \
    0
  updatedDescription=$?

  default=$(echo "${markdown}" | sed -n "/^\`\`\`json$/,/^\`\`\`$/p" | tail -n +2 | sed -e '$ d' | jq ".\"${setting}\"")
  jsonReplace \
    'package.json' \
    ".contributes.configuration.properties.\"${setting}\".default" \
    "${default}" \
    1
  updatedDefault=$?
  
  if [ "${updatedDescription}" = 1 ] || [ "${updatedDefault}" = 1 ]; then
    return 1
  else
    return 0
  fi
}

updateMarkdownDescription "cucumber.features"
updateResult1=$?
updateMarkdownDescription "cucumber.glue"
updateResult2=$?
updateMarkdownDescription "cucumber.parameterTypes"
updateResult3=$?
updateMarkdownDescription "cucumber.unescapeBackslashes"
updateResult4=$?

if [ "$updateResult1" -eq 1 ] || [ "$updateResult2" -eq 1 ] || [ "$updateResult3" -eq 1 ] || [ "$updateResult4" -eq 1 ]; then
  echo "The settings descriptions and default values in 'package.json' do not match those specified in 'README.md'. Updating 'package.json' to match."
  exit 1
else
  echo "The settings descriptions and default values in 'package.json' match those specified in 'README.md'."
  exit 0
fi
