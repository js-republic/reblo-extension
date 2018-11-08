//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as myExtension from '../extension';
import { ExtensionContext } from './extension-context.mock';

suite('work as expected', () => {
  test('test', () => {
    myExtension.activate(
      ExtensionContext({
        workSpace: {
          get: key => {
            assert.equal(key, 'userId');
          },
          update: (key, val) => {}
        }
      })
    );
  });
});
