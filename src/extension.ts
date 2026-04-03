import { startEmbeddedServer } from '@cucumber/language-server/wasm'
import vscode from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'

import { VscodeFiles } from './VscodeFiles'

let client: LanguageClient

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function activate(context: vscode.ExtensionContext) {
  const serverOptions: ServerOptions = async () =>
    startEmbeddedServer(
      __dirname,
      () => new VscodeFiles(vscode.workspace.fs),
      () => undefined
    )

  const clientOptions: LanguageClientOptions = {
    // We need to list all supported languages here so that
    // the language server is notified to reindex when a file changes
    // https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
    documentSelector: [
      { scheme: 'file', language: 'csharp' },
      { scheme: 'file', language: 'cucumber' },
      { scheme: 'file', language: 'java' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'php' },
      { scheme: 'file', language: 'ruby' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
      { scheme: 'file', language: 'python' },
      { scheme: 'file', language: 'rust' },
    ],
  }

  client = new LanguageClient('Cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  console.log('Connecting to Cucumber Language Server')
  await client.start()

  // Register the force reindex command
  const forceReindexCommand = vscode.commands.registerCommand('cucumber.forceReindex', async () => {
    if (!client || !client.isRunning()) {
      vscode.window.showWarningMessage('Cucumber Language Server is not running')
      return
    }

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Cucumber: Reindexing...',
          cancellable: false,
        },
        async () => {
          const result = await client.sendRequest<{ success: boolean; error?: string }>(
            'cucumber/forceReindex'
          )
          if (result.success) {
            vscode.window.showInformationMessage('Cucumber: Reindexing completed successfully')
          } else {
            vscode.window.showErrorMessage(`Cucumber: Reindexing failed - ${result.error}`)
          }
        }
      )
    } catch (error) {
      vscode.window.showErrorMessage(`Cucumber: Failed to trigger reindex - ${error}`)
    }
  })

  context.subscriptions.push(forceReindexCommand)
}

// this method is called when your extension is deactivated
export async function deactivate() {
  await client.stop()
}
