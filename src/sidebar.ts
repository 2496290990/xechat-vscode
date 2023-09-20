import * as vscode from "vscode";

export class XechatVscodeViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "api.to.ts";
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    webviewView.webview.html = this._getHtmlForWebview(
      webviewView.webview,
      nonce
    );

    webviewView.webview.onDidReceiveMessage(async (data) => {
     
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview, nonce: string) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <!--
            Use a content security policy to only allow loading styles from our extension directory,
            and only allow scripts that have a specific nonce.
            (See the 'webview-sample' extension sample for img-src content security policy examples)
        -->
        
        <meta http-equiv="Content-Security-Policy" content="style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" connect-src 'self';>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Xechat-vscode</title>
      </head>
      <body>
        
      </body>
    </html>
    `;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
