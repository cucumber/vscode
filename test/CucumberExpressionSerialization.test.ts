import { CucumberExpressions } from '@cucumber/language-server'
import assert from 'assert'

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
          true
        )
      )
      const expected: CucumberExpressions.ParameterTypeRegistryJson = {
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
      assert.deepStrictEqual(registry.toJSON(), expected)

      const registryFromJson = CucumberExpressions.ParameterTypeRegistry.fromJSON(registry.toJSON())
      assert(registryFromJson.lookupByTypeName('color'))
    })
  })

  describe('ParameterType', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      const expression = new CucumberExpressions.CucumberExpression('hello', registry)
      const expected: CucumberExpressions.CucumberExpressionJson = {
        type: 'CucumberExpression',
        expression: 'hello',
      }
      assert.deepStrictEqual(expression.toJSON(), expected)

      const factory = new CucumberExpressions.ExpressionFactory(registry)
      assert.deepStrictEqual(factory.createExpressionFromJson(expected).toJSON(), expected)
    })
  })

  describe('CucumberExpression', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      const expression = new CucumberExpressions.CucumberExpression('hello', registry)
      const expected: CucumberExpressions.CucumberExpressionJson = {
        type: 'CucumberExpression',
        expression: 'hello',
      }
      assert.deepStrictEqual(expression.toJSON(), expected)

      const factory = new CucumberExpressions.ExpressionFactory(registry)
      assert.deepStrictEqual(factory.createExpressionFromJson(expected).toJSON(), expected)
    })
  })

  describe('RegularExpression', () => {
    it('can be serialized', () => {
      const registry = new CucumberExpressions.ParameterTypeRegistry()
      const expression = new CucumberExpressions.RegularExpression(/hello/i, registry)
      const expected: CucumberExpressions.RegularExpressionJson = {
        type: 'RegularExpression',
        expression: 'hello',
        flags: 'i',
      }
      assert.deepStrictEqual(expression.toJSON(), expected)

      const factory = new CucumberExpressions.ExpressionFactory(registry)
      assert.deepStrictEqual(factory.createExpressionFromJson(expected).toJSON(), expected)
    })
  })
})
