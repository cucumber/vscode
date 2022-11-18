import { CucumberExpressions } from '@cucumber/language-server'
import assert from 'assert'

import {
  CucumberExpressionJson,
  expressionFromJson,
  expressionToJson,
  ParameterTypeRegistryJson,
  registryFromJson,
  registryToJson,
  RegularExpressionJson,
} from '../src/CucumberExpressionsSerde'

describe('Serialization', () => {
  describe('ParameterTypeRegistry', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      registry.defineParameterType(
        new CucumberExpressions.ParameterType(
          'color',
          /red|blue|yellow/,
          null,
          (s: string) => s,
          false,
          true,
          false
        )
      )
      const expected: ParameterTypeRegistryJson = {
        parameterTypes: [
          {
            name: 'color',
            regexpStrings: ['red|blue|yellow'],
            useForSnippets: false,
            preferForRegexpMatch: true,
            builtin: false,
          },
        ],
      }
      assert.deepStrictEqual(registryToJson(registry), expected)

      const fromJson = registryFromJson(registryToJson(registry))
      assert(fromJson.lookupByTypeName('color'))
    })
  })

  describe('CucumberExpression', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      const expression = new CucumberExpressions.CucumberExpression('hello', registry)
      const expected: CucumberExpressionJson = {
        type: 'CucumberExpression',
        expression: 'hello',
      }
      assert.deepStrictEqual(expressionToJson(expression), expected)
      assert.deepStrictEqual(expressionToJson(expressionFromJson(registry, expected)), expected)
    })
  })

  describe('RegularExpression', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      const expression = new CucumberExpressions.RegularExpression(/hello/i, registry)
      const expected: RegularExpressionJson = {
        type: 'RegularExpression',
        expression: 'hello',
        flags: 'i',
      }
      assert.deepStrictEqual(expressionToJson(expression), expected)
      assert.deepStrictEqual(expressionToJson(expressionFromJson(registry, expected)), expected)
    })
  })
})
