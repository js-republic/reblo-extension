'use strict';

import * as vscode from 'vscode';
import * as uniqid from 'uniqid';

import { Api } from './api';

const api = new Api();

export function activate(context: vscode.ExtensionContext) {

    console.log('API request has been sent');

    const userId = uniqid();

    // The command has been defined in the package.json file
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Reblo has started !');
        api.sendFileChange(userId);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
