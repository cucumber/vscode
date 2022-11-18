import { CucumberExpressions } from '@cucumber/language-server'

export type CucumberExpressionJson = {
  type: 'CucumberExpression'
  expression: string
}

export type RegularExpressionJson = {
  type: 'RegularExpression'
  expression: string
  flags: string
}

export type ExpressionJson = CucumberExpressionJson | RegularExpressionJson

export type ParameterTypeJson = {
  name: string | undefined
  regexpStrings: readonly string[]
  useForSnippets?: boolean
  preferForRegexpMatch?: boolean
  builtin?: boolean
}

export type ParameterTypeRegistryJson = {
  parameterTypes: readonly ParameterTypeJson[]
}

export function expressionToJson(expression: CucumberExpressions.Expression): ExpressionJson {
  if (expression instanceof CucumberExpressions.RegularExpression) {
    return {
      type: 'RegularExpression',
      expression: expression.regexp.source,
      flags: expression.regexp.flags,
    }
  } else if (expression instanceof CucumberExpressions.CucumberExpression) {
    return {
      type: 'CucumberExpression',
      expression: expression.source,
    }
  } else {
    throw new Error(`Unexpected expression: ${JSON.stringify(expression)}`)
  }
}

export function expressionFromJson(
  registry: CucumberExpressions.ParameterTypeRegistry,
  json: ExpressionJson
): CucumberExpressions.Expression {
  switch (json.type) {
    case 'CucumberExpression':
      return new CucumberExpressions.CucumberExpression(json.expression, registry)
    case 'RegularExpression':
      return new CucumberExpressions.RegularExpression(
        new RegExp(json.expression, json.flags),
        registry
      )
  }
}

export function registryToJson(
  registry: CucumberExpressions.ParameterTypeRegistry
): ParameterTypeRegistryJson {
  return {
    parameterTypes: [...registry.parameterTypes].filter((t) => !t.builtin).map(parameterTypeToJson),
  }
}

export function registryFromJson(
  json: ParameterTypeRegistryJson
): CucumberExpressions.ParameterTypeRegistry {
  const registry = new CucumberExpressions.ParameterTypeRegistry()
  for (const parameterTypeJson of json.parameterTypes) {
    const parameterType = new CucumberExpressions.ParameterType(
      parameterTypeJson.name,
      parameterTypeJson.regexpStrings,
      null,
      () => undefined,
      parameterTypeJson.useForSnippets,
      parameterTypeJson.preferForRegexpMatch,
      parameterTypeJson.builtin
    )
    registry.defineParameterType(parameterType)
  }
  return registry
}

export function parameterTypeToJson(
  type: CucumberExpressions.ParameterType<unknown>
): ParameterTypeJson {
  const { name, regexpStrings, useForSnippets, preferForRegexpMatch, builtin } = type
  return { name, regexpStrings, useForSnippets, preferForRegexpMatch, builtin }
}
