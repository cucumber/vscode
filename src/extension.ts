import { newWasmServer } from '@cucumber/language-server'
import vscode from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node'

let client: LanguageClient

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // const serverModule = context.asAbsolutePath(path.join('out', 'cucumber-language-server.js'))
  // const serverOptions: ServerOptions = { module: serverModule, transport: TransportKind.ipc }
  const serverOptions: ServerOptions = async () => newWasmServer(__dirname)

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
