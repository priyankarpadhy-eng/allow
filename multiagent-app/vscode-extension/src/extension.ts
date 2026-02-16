import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Use 127.0.0.1 to avoid some 'localhost' specific PNA restrictions in Chrome
    const agentProvider = new AlloyViewProvider(context.extensionUri, 'http://127.0.0.1:3000/embed/agents');
    const feedProvider = new AlloyViewProvider(context.extensionUri, 'http://127.0.0.1:3000/embed/feed');

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('alloy.agents', agentProvider),
        vscode.window.registerWebviewViewProvider('alloy.feed', feedProvider)
    );
}

class AlloyViewProvider implements vscode.WebviewViewProvider {
    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _url: string
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';">
                <style>
                    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: transparent; }
                    iframe { width: 100%; height: 100%; border: none; }
                </style>
            </head>
            <body>
                <iframe src="${this._url}" allow="clipboard-read; clipboard-write;"></iframe>
            </body>
            </html>`;
    }
}
