"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = require("vscode");
function activate(context) {
    const agentProvider = new AlloyViewProvider(context.extensionUri, 'http://localhost:3000/embed/agents');
    const feedProvider = new AlloyViewProvider(context.extensionUri, 'http://localhost:3000/embed/feed');
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('alloy.agents', agentProvider), vscode.window.registerWebviewViewProvider('alloy.feed', feedProvider));
}
class AlloyViewProvider {
    constructor(_extensionUri, _url) {
        this._extensionUri = _extensionUri;
        this._url = _url;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    _getHtmlForWebview(webview) {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: transparent; }
                    iframe { width: 100%; height: 100%; border: none; }
                </style>
            </head>
            <body>
                <iframe src="${this._url}"></iframe>
            </body>
            </html>`;
    }
}
//# sourceMappingURL=extension.js.map