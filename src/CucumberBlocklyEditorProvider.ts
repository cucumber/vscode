import vscode from 'vscode'

import { getNonce } from './util.js'
const extensionId = 'Cucumber.Blockly'
const themeKey = `${extensionId}.theme`

// https://cs.github.com/hileix/vscode-drawio/blob/5ecbe969ca1c4137b3646e65ddb750efc4ba17b7/src/DrawioAppServer/HostedDrawioAppServer.ts
export class CucumberBlocklyEditorProvider implements vscode.CustomTextEditorProvider {
  private static readonly viewType = 'Cucumber.Blockly'

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new CucumberBlocklyEditorProvider(context)
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      CucumberBlocklyEditorProvider.viewType,
      provider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
    return providerRegistration
  }

  constructor(private readonly context: vscode.ExtensionContext) {}

  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _token: vscode.CancellationToken
  ): Promise<void | Thenable<void>> {
    webviewPanel.webview.options = { enableScripts: true }

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview)

    function updateWebview() {
      webviewPanel.webview.postMessage({
        type: 'update',
        text: document.getText(),
      })
    }

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview()
      }
    })

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose()
    })
  }

  // private getTheme(): string {
  //   const c = vscode.workspace.getConfiguration()
  //   const theme = c.get<string>(themeKey, 'automatic')
  //
  //   if (theme !== 'automatic') {
  //     return theme
  //   }
  //
  //   const ctk = vscode.ColorThemeKind
  //   return {
  //     [ctk.Light]: 'Kennedy',
  //     [ctk.Dark]: 'dark',
  //     [ctk.HighContrast]: 'Kennedy',
  //   }[vscode.window.activeColorTheme.kind]
  // }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'cucumberBlockly.js')
    )

    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'reset.css')
    )

    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'vscode.css')
    )

    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'catScratch.css')
    )

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce()

    return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet" />
				<link href="${styleVSCodeUri}" rel="stylesheet" />
				<link href="${styleMainUri}" rel="stylesheet" />

				<title>Cat Scratch</title>
			</head>
			<body>
				<div class="notes">
					<div class="add-button">
						<button>Scratch!</button>
					</div>
				</div>

        <div id="blockly"></div>
        <div id="blocklyXml"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>
      `
  }
}
