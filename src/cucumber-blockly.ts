// const vscode = acquireVsCodeApi()

import { mount } from '@cucumber/blockly'

const $app = document.querySelector('#app')

if ($app) {
  // @ts-ignore
  const media = window.blocklyMedia
  mount($app, `Feature: Hello\n  Scenario: World\n    Given a teapot`, [], [], media, () => {
    console.log('Blockly changed')
  })
}
