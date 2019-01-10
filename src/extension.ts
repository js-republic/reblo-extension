'use strict';
import * as vscode from 'vscode';

import { checkFileChanges, createUserId, handleTextDocument } from './utils';

export function activate(context: vscode.ExtensionContext) {
  createUserId(context);

  const disposable = [
    vscode.window.onDidChangeActiveTextEditor(() => {
      checkFileChanges(context);
    }),
    vscode.workspace.onDidSaveTextDocument(textDocument => {
      handleTextDocument(textDocument, context);
    })
  ];

  // save number of line written between two saves or Nb of line changed on save
  context.subscriptions.push(...disposable);
}

export function deactivate() {}
