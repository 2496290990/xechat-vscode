// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as fs from 'fs';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xechat-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('xechat-vscode.open', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from xechat-vscode!');
		const panel = vscode.window.createWebviewPanel(
			'webview',
			'Xechat-vscode',
			vscode.ViewColumn.Beside,
			{
				enableScripts: true, // 在 Webview 中启用 JavaScript 执行
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
			}
		);
		// 设置Webview面板的HTML内容
		// panel.webview.html = fs.readFileSync(htmlPath.fsPath, 'utf-8');
		panel.webview.html = vueWebview(context, panel);
	});

	context.subscriptions.push(disposable);
}
export function vueWebview(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
	// const chunkJs =  panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "src/dist/js", "chunk-vendors.01170ff8.js"))).toString();
	// const indexJs = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "src/dist/js", "index.6a1085b3.js"))).toString();
	// const chunkCSS = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "src/dist/css", "chunk-vendors.cec497f3.css"))).toString();
	// const indexCSS = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "src/dist/css", "index.82d4104a.css"))).toString();
	const chunkJs = getAsWebviewUrl(context, panel, 'src/dist/js', 'chunk-vendors.01170ff8.js');
	const indexJs = getAsWebviewUrl(context, panel, 'src/dist/js', 'index.6a1085b3.js');
	const chunkCSS = getAsWebviewUrl(context, panel, 'src/dist/css', 'chunk-vendors.cec497f3.css');
	const indexCSS = getAsWebviewUrl(context, panel, 'src/dist/css', 'index.82d4104a.css');
	return `<!doctype html>
<html lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Vue App</title>
  <script defer="defer" src="${chunkJs}"></script>
  <script defer="defer" src="${indexJs}"></script>
  <link href="${chunkCSS}" rel="stylesheet">
  <link href="${indexCSS}" rel="stylesheet">
</head>
<body>
<div id="app"></div>
</body>
</html>`;
}

function getAsWebviewUrl(context: vscode.ExtensionContext, panel: vscode.WebviewPanel, filePath: string, filename: string) {
	return panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, filePath, filename))).toString();		
}
// This method is called when your extension is deactivated
export function deactivate() {}
