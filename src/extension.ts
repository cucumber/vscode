import path from 'path'
import vscode from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node'

import { CucumberBlocklyEditorProvider } from './CucumberBlocklyEditorProvider.js'

let client: LanguageClient

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(CucumberBlocklyEditorProvider.register(context))

  const serverModule = context.asAbsolutePath(path.join('out', 'cucumber-language-server.js'))
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  const clientOptions: LanguageClientOptions = {
    // We need to list all supported languages here so that
    // the language server is notified to reindex when a file changes
    documentSelector: [
      { scheme: 'file', language: 'csharp' },
      { scheme: 'file', language: 'cucumber' },
      { scheme: 'file', language: 'java' },
      { scheme: 'file', language: 'php' },
      { scheme: 'file', language: 'ruby' },
      { scheme: 'file', language: 'typescript' },
    ],
  }

  client = new LanguageClient('Cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  await client.start()
}

// this method is called when your extension is deactivated
export async function deactivate() {
  await client.stop()
}
