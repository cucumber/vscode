// const vscode = acquireVsCodeApi()
import { mount } from '@cucumber/blockly'

import { expressionFromJson, registryFromJson } from './CucumberExpressionsSerde'

const $app = document.querySelector('#app')

// @ts-ignore
console.log('registryJson', registryJson)
// @ts-ignore
console.log('expressionsJson', expressionsJson)

if ($app) {
  // @ts-ignore
  const registry = registryFromJson(registryJson)
  // @ts-ignore
  const expressions = expressionsJson.map((expressionJson) =>
    expressionFromJson(registry, expressionJson)
  )
  // @ts-ignore
  const suggestions = suggestionsJson

  console.log('TWO')

  // @ts-ignore
  mount($app, gherkinSource, suggestions, expressions, blocklyMedia, () => {
    console.log('Blockly changed')
  })
}
