import { Suggestion } from '@cucumber/language-server'
import * as vscode from 'vscode'

export class CucumberBlocklyEditorProvider implements vscode.CustomTextEditorProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ) {
    webviewPanel.webview.options = { enableScripts: true }
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview)
  }

  onSuggestions(suggestions: readonly Suggestion[]) {
    console.log('SUGGG', suggestions)
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    // Local path to script and css for the webview
    const mediaUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media'))

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'cucumber-blockly.js')
    )

    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'reset.css')
    )

    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vscode.css')
    )

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce()

    return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${
        webview.cspSource
      }; style-src 'unsafe-inline' ${webview.cspSource}; media-src ${
      webview.cspSource
    }; script-src 'nonce-${nonce}';">
      <title>Cucumber Blocks</title>
      <link href="${styleResetUri}" rel="stylesheet">
			<link href="${styleVSCodeUri}" rel="stylesheet">
      <style>
        .flex-container {
          display: flex;
        }

        .flex-child {
          flex: 1;
        }

        .flex-child:first-child {
          margin-right: 20px;
        }

        .cucumber-blockly {
          height: 800px;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="flex-container">
        <div class="flex-child" id="app"></div>
      </div>
      <script nonce="${nonce}">
        window.blocklyMedia = ${JSON.stringify(mediaUri.toString())}
      </script>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`
  }
}

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
