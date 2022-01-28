import vscode from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node'
import path from 'path'

let client: LanguageClient

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('out', 'server.js'))
  console.log('Cucumber Extension: Loading LSP server from ' + serverModule)
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
    documentSelector: [{ scheme: 'file', language: 'gherkin' }],
  }

  client = new LanguageClient('Cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  const disposeClient = client.start()
  context.subscriptions.push(disposeClient)

  console.log('Cucumber extension activated')
}

// this method is called when your extension is deactivated
export function deactivate() {
  // no-op
}
