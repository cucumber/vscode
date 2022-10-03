import vscode from 'vscode'

export class CucumberDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  public provideDocumentSymbols(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[]> {
    return new Promise((resolve, reject) => {
      const symbols: vscode.DocumentSymbol[] = []
      const nodes = [symbols]
      let isFeature = false

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i)
        const feature = line.text.match(new RegExp('(?<=Feature:).*'))
        const scenario = line.text.match(new RegExp('(?<=Scenario:).*'))

        if (feature) {
          const featureSymbol = new vscode.DocumentSymbol(
            feature[0],
            'Feature',
            vscode.SymbolKind.Field,
            line.range,
            line.range
          )

          nodes[nodes.length - 1].push(featureSymbol)
          if (!isFeature) {
            nodes.push(featureSymbol.children)
            isFeature = true
          }
        } else if (scenario) {
          const scenarioSymbol = new vscode.DocumentSymbol(
            scenario[0],
            'Scenario',
            vscode.SymbolKind.Method,
            line.range,
            line.range
          )

          nodes[nodes.length - 1].push(scenarioSymbol)
          if (!isFeature) {
            nodes.push(scenarioSymbol.children)
            isFeature = true
          }
        }
      }

      resolve(symbols)
    })
  }
}
