/**
 * This script copies the keywords from all Gherkin languages into `cucumber.tmLanguage.json`'s regular expressions, saving the modified copy to `out/cucumber.tmLanguage.json` for use by the VSCode extension.
 */
const fs = require('fs')
const path = require('path')

const languages = JSON.parse(
  fs.readFileSync('node_modules/@cucumber/gherkin/src/gherkin-languages.json', 'utf8')
)

function getLanguageKeywords(languages) {
  const keywords = {
    feature: new Set(),
    rule: new Set(),
    background: new Set(),
    scenario: new Set(),
    step: new Set(),
    examples: new Set(),
  }
  for (const lang in languages) {
    const data = lang[language]
    data.feature.forEach((k) => keywords.feature.add(k.trim()))
    data.rule.forEach((k) => keywords.rule.add(k.trim()))
    data.background.forEach((k) => keywords.background.add(k.trim()))
    data.scenario.forEach((k) => keywords.scenario.add(k.trim()))
    data.scenarioOutline.forEach((k) => keywords.scenario.add(k.trim()))
    data.given.forEach((k) => keywords.step.add(k.trim()))
    data.when.forEach((k) => keywords.step.add(k.trim()))
    data.then.forEach((k) => keywords.step.add(k.trim()))
    data.and.forEach((k) => keywords.step.add(k.trim()))
    data.but.forEach((k) => keywords.step.add(k.trim()))
    data.examples.forEach((k) => keywords.examples.add(k.trim()))
  }
  function doubleEscape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  return Object.fromEntries(
    Object.entries(keywords).map(([k, set]) => [k, Array.from(set).map(doubleEscape).join('|')])
  )
}

const keywords = getLanguageKeywords(languages)
const tmLanguage = JSON.parse(fs.readFileSync('cucumber.tmLanguage.json', 'utf8'))
tmLanguage.patterns.forEach((p) => {
  if (p.name === 'meta.feature.cucumber') {
    p.begin = p.begin.replace('Feature', keywords.feature)
  } else if (p.name === 'meta.rule.cucumber') {
    p.begin = p.begin.replace('Rule', keywords.rule)
  } else if (p.name === 'meta.background.cucumber') {
    p.begin = p.begin.replace('Background', keywords.background)
  } else if (p.name === 'meta.scenario.cucumber') {
    p.begin = p.begin.replace('Scenario(?: Outline| Template)?|Example', keywords.scenario)
  } else if (p.name === 'meta.step.cucumber') {
    p.begin = p.begin.replace('Given|When|Then|And|But', keywords.step)
  } else if (p.name === 'meta.examples.cucumber') {
    p.begin = p.begin.replace('Examples|Scenarios', keywords.examples)
  }
})
const outPath = 'out/cucumber.tmLanguage.json'
if (!fs.existsSync(path.dirname(outPath))) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
}
fs.writeFileSync(outPath, JSON.stringify(tmLanguage))
