import * as uniqid from 'uniqid';
import { ExtensionContext, window, TextDocument } from 'vscode';

import { Api } from './api';

const api = new Api();

export function checkFileChanges(context: ExtensionContext): void {
  const file = window.activeTextEditor;
  const userId = getUserId(context);

  if (file && userId) {
    api.sendFileChange(
      userId,
      file.document.fileName,
      file.document.languageId
    );
  }
}
let lastLineNb: { [key: string]: number } = {};

export const handleTextDocument = (
  textDocument: TextDocument,
  context: ExtensionContext
): void => {
  const key = textDocument.fileName;
  const previousLoC = lastLineNb[key] || 0;
  const currentLoC = textDocument.lineCount - previousLoC;
  lastLineNb[key] = textDocument.lineCount;
  const userId = getUserId(context);
  api.sendLineOfCode(userId, currentLoC);
};

export function createUserId(context: ExtensionContext) {
  let userId = context.workspaceState.get('userId') as string | undefined;
  if (!userId) {
    userId = uniqid();
    context.workspaceState.update('userId', userId);
  }
  api.sendUser(userId);
}

export function getUserId(context: ExtensionContext): string {
  return context.workspaceState.get('userId') as string;
}
