import { mount } from '@cucumber/blockly'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const $cucumberBlockly = document.querySelector('#cucumberBlockly')!

const gherkinSource = `
    Feature: Hello
      Scenario: the hungry one
        Given I have 37 cukes in my basket
        And there are 13 blind mice
        And some other gibberish
  `
mount($cucumberBlockly, gherkinSource, [], [], (err, gherkinSource, workspaceXml) => {
  if (err) console.error(err)
  if (gherkinSource) console.log(gherkinSource)
})
