// const vscode = acquireVsCodeApi()
import { mount } from '@cucumber/blockly'

import { expressionFromJson } from './CucumberExpressionsSerde'

const $app = document.querySelector('#app')

if ($app) {
  // @ts-ignore
  const expressions = JSON.parse(expressionsJson).map((expressionJson) =>
    expressionFromJson(expressionJson)
  )
  // @ts-ignore
  const suggestions = JSON.parse(suggestionsJson)

  console.log('TWO')

  // @ts-ignore
  mount($app, gherkinSource, suggestions, expressions, blocklyMedia, () => {
    console.log('Blockly changed')
  })
}
