import { startEmbeddedServer } from '@cucumber/language-server/wasm'
import vscode from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'

import { CucumberBlocklyEditorProvider } from './CucumberBlocklyEditorProvider'
import { VscodeFiles } from './VscodeFiles'

let client: LanguageClient

export async function activate(context: vscode.ExtensionContext) {
  console.log('ACTIVATED******')
  const serverOptions: ServerOptions = async () => {
    // eslint-disable-next-line prefer-const
    let blocklyProvider: CucumberBlocklyEditorProvider
    const serverInfo = startEmbeddedServer(
      __dirname,
      () => new VscodeFiles(vscode.workspace.fs),
      (registry, expressions, suggestions) => {
        serverInfo.connection.console.log(
          `******** onReindexed: ${expressions.length}, ${suggestions.length}`
        )
        blocklyProvider.onReindexed(registry, expressions, suggestions)
      }
    )
    blocklyProvider = new CucumberBlocklyEditorProvider(
      context,
      serverInfo.server.registry,
      serverInfo.server.expressions,
      serverInfo.server.suggestions
    )

    // blocklyProvider.onReindexed(serverInfo.server.expressions, serverInfo.server.suggestions)
    context.subscriptions.push(
      vscode.window.registerCustomEditorProvider('Cucumber.Blockly', blocklyProvider)
    )
    return serverInfo
  }

  const clientOptions: LanguageClientOptions = {
    // We need to list all supported languages here so that
    // the language server is notified to reindex when a file changes
    // https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
    documentSelector: [
      { scheme: 'file', language: 'csharp' },
      { scheme: 'file', language: 'cucumber' },
      { scheme: 'file', language: 'java' },
      { scheme: 'file', language: 'php' },
      { scheme: 'file', language: 'ruby' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
      { scheme: 'file', language: 'python' },
      { scheme: 'file', language: 'rust' },
    ],
  }

  client = new LanguageClient('Cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  await client.start()
}

// this method is called when your extension is deactivated
export async function deactivate() {
  await client.stop()
}
