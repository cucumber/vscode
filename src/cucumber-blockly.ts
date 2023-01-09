// const vscode = acquireVsCodeApi()
import { mount } from '@cucumber/blockly'
import { Suggestion } from '@cucumber/language-server'

import {
  expressionFromJson,
  ExpressionJson,
  ParameterTypeRegistryJson,
  registryFromJson,
} from './CucumberExpressionsSerde'

declare global {
  interface Window {
    gherkinSource: string
    registryJson: ParameterTypeRegistryJson
    expressionsJson: ExpressionJson[]
    suggestionsJson: Suggestion[]
    blocklyMedia: string
  }
}

const $app = document.querySelector('#app')

if ($app) {
  const registry = registryFromJson(window.registryJson)
  const expressions = window.expressionsJson.map((expressionJson) =>
    expressionFromJson(registry, expressionJson)
  )

  mount(
    $app,
    window.gherkinSource,
    window.suggestionsJson,
    expressions,
    window.blocklyMedia,
    (error, gherkinSource) => {
      if (error) {
        console.error(error)
        return
      }
      // TODO: Send a message with the new source
      console.log(gherkinSource)
    }
  )
}
