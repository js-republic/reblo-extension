import * as uniqid from 'uniqid';
import { ExtensionContext, window } from 'vscode';

import { Api } from './api';

const api = new Api();

export function checkFileChanges(context: ExtensionContext): void {
  const file = window.activeTextEditor;
  const userId: string = getUserId(context);

  if (file && userId) {
    api.sendFileChange(
      userId,
      file.document.fileName,
      file.document.languageId
    );
  }
}

export function createUserId(context: ExtensionContext) {
  if (!context.workspaceState.get('userId')) {
    context.workspaceState.update('userId', uniqid());
  }
}

export function getUserId(context: ExtensionContext): string {
  return context.workspaceState.get('userId') as string;
}
