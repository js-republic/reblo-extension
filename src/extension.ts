'use strict';
import * as vscode from 'vscode';

import { checkFileChanges, createUserId } from './utils';

export function activate(context: vscode.ExtensionContext) {
  createUserId(context);

  let disposable = vscode.window.onDidChangeActiveTextEditor(() => {
    checkFileChanges(context);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
