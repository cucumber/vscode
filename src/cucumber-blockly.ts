// const vscode = acquireVsCodeApi()

import { mount } from '@cucumber/blockly'

const app = document.querySelector('#app')
//const media = document.querySelector('#media')

if (app) {
  // app.innerHTML = '<h1>New content</h1>'
  const media =
    'https://file+.vscode-resource.vscode-cdn.net/Users/Aslak.Hellesoy/git/cucumber/vscode/media'
  mount(app, `Feature: Hello\n  Scenario: World\n    Given a teapot`, [], [], media, () => {
    console.log('Blockly changed')
  })
}
