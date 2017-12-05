import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when, assertWasCalled } from './../../testing';

import { logMessagePrefix, logMessage, getFilePathLogMessage } from './../src/utilities';

the('build utilities module', () => {

  when('logMessage invoked', () => {

    const stubConsole = { log: () => {} };
    const stubConsoleLog = sinon.stub(stubConsole, 'log');

    should('console log a formatted message including action & context', () => {

      logMessage('SomeAction ', { magenta: 'SomeContext' }, stubConsole);

      assertWasCalled(stubConsoleLog, `${logMessagePrefix}SomeAction SomeContext`);
    });
  });

  when('getFilePathLogMessage invoked', () => {

    should('return a \'writing file\' message', () => {

      const result = getFilePathLogMessage('SomeFilePath');

      expect(result).to.equal(' Writing SomeFilePath');
    });
  });
});