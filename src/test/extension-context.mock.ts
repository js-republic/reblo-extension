export const Memento = (spy?: MementoSpy) => {
  return {
    /**
     * Return a value.
     *
     * @param key A string.
     * @return The stored value or `undefined`.
     */
    get: (key: string, defaultValue?: any) => {
      console.log('get', key, defaultValue);
      return spy && spy.get(key, defaultValue);
    },

    /**
     * Store a value. The value must be JSON-stringifyable.
     *
     * @param key A string.
     * @param value A value. MUST not contain cyclic references.
     */
    update: (key: string, value: any) => {
      spy && spy.update(key, value);
      return Promise.resolve();
    }
  };
};
interface MementoSpy {
  get: (key: string, defaultValue: any) => void;
  update: (key: string, defaultValue: any) => void;
}
export const ExtensionContext = (spy: {
  workSpace?: MementoSpy;
  globalState?: MementoSpy;
}) => {
  return {
    /**
     * An array to which disposables can be added. When this
     * extension is deactivated the disposables will be disposed.
     */
    subscriptions: [],
    /**
     * A memento object that stores state in the context
     * of the currently opened [workspace](#workspace.workspaceFolders).
     */
    workspaceState: Memento(spy.workSpace),
    /**
     * A memento object that stores state independent
     * of the current opened [workspace](#workspace.workspaceFolders).
     */
    globalState: Memento(spy.globalState),
    /**
     * The absolute file path of the directory containing the extension.
     */
    extensionPath: 'testExtensionPath',
    /**
     * Get the absolute path of a resource contained in the extension.
     *
     * @param relativePath A relative path to a resource contained in the extension.
     * @return The absolute path of the resource.
     */
    asAbsolutePath: (relativePath: string) => {
      return relativePath;
    },
    /**
     * An absolute file path of a workspace specific directory in which the extension
     * can store private state. The directory might not exist on disk and creation is
     * up to the extension. However, the parent directory is guaranteed to be existent.
     *
     * Use [`workspaceState`](#ExtensionContext.workspaceState) or
     * [`globalState`](#ExtensionContext.globalState) to store key value data.
     */
    storagePath: 'storagePath',
    /**
     * An absolute file path of a directory in which the extension can create log files.
     * The directory might not exist on disk and creation is up to the extension. However,
     * the parent directory is guaranteed to be existent.
     */
    logPath: 'logPath'
  };
};
