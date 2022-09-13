import { newWasmServer } from '@cucumber/language-server'
import vscode from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'

import { CucumberBlocklyEditorProvider } from './CucumberBlocklyEditorProvider.js'
import { VscodeFiles } from './VscodeFiles'

let client: LanguageClient

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(CucumberBlocklyEditorProvider.register(context))
  const makeFiles = (rootUri: string) => new VscodeFiles(rootUri, vscode.workspace.fs)
  const serverOptions: ServerOptions = async () => newWasmServer(__dirname, makeFiles)

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
    ],
  }

  client = new LanguageClient('Cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  await client.start()
}

// this method is called when your extension is deactivated
export async function deactivate() {
  await client.stop()
}
