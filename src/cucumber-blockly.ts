// const vscode = acquireVsCodeApi()
import { mount } from '@cucumber/blockly'
import { CucumberExpressions } from '@cucumber/language-server'

const $app = document.querySelector('#app')

if ($app) {
  console.log('ONE')
  // @ts-ignore
  const registry = CucumberExpressions.ParameterTypeRegistry.fromJSON(JSON.parse(registryJson))
  const factory = new CucumberExpressions.ExpressionFactory(registry)
  // @ts-ignore
  const expressions = JSON.parse(expressionsJson).map((expressionJson) =>
    factory.createExpressionFromJson(expressionJson)
  )
  // @ts-ignore
  const suggestions = JSON.parse(suggestionsJson)

  console.log('TWO')

  // @ts-ignore
  mount($app, gherkinSource, suggestions, expressions, blocklyMedia, () => {
    console.log('Blockly changed')
  })
}
