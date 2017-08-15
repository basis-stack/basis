import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, withScenario, should } from './../../packages/testing/aliases';

import constants from './../../src/server/core/constants';
import { onListening, onError } from './../../src/server/bin/handlers';

the('(server) handlers', () => {

  when('listening handled', () => {

    const stubConfig = { webServerPort: 'SomePort' };
    const stubLogger = { info: () => {} };
    const stubLoggerInfo = sinon.spy(stubLogger, 'info');

    onListening(stubConfig, stubLogger);

    should('Log an info message to logger indicating server start and port number', () => {

      const expectedMessage = `${constants.text.logging.serverPrefix} STARTED: listening on port SomePort`;
      expect(stubLoggerInfo.calledWithExactly(expectedMessage)).to.equal(true);
    });
  });

  when('non-listen error handled', () => {

    const stubError = { syscall: 'someNonListenCall' };
    let result;

    try {
      onError(undefined, undefined, stubError, undefined);
    } catch (error) {
      result = error;
    }

    should('throw the error', () => {

      expect(result).to.equal(stubError);
    });
  });

  when('server error handled', () => {

    let loggerErrorSpy;
    let callbackInvoked;
    const stubError = { syscall: 'listen' };
    const stubLogger = { error: () => {} };
    const stubConfig = { webServerPort: '666' };
    const stubCallback = () => { callbackInvoked = true; };

    const resetStubs = () => {

      stubError.code = undefined;
      callbackInvoked = false;
      loggerErrorSpy.restore();
    };

    withScenario('EACCES', () => {

      before(() => {

        stubError.code = 'EACCES';
        loggerErrorSpy = sinon.spy(stubLogger, 'error');

        onError(stubConfig, stubLogger, stubError, stubCallback);
      });

      after(() => {

        resetStubs();
      });

      should('log friendly \'elevated privileges\' error message', () => {

        const expectedMessage = `${constants.text.logging.serverPrefix} LISTEN_ERROR: port 666 requires elevated privileges`;
        expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });

      should('invoke callback', () => {

        expect(callbackInvoked).to.equal(true);
      });
    });

    withScenario('EADDRINUSE', () => {

      before(() => {

        stubError.code = 'EADDRINUSE';
        loggerErrorSpy = sinon.spy(stubLogger, 'error');

        onError(stubConfig, stubLogger, stubError, stubCallback);
      });

      after(() => {

        resetStubs();
      });

      should('log friendly \'port in use\' error message', () => {

        const expectedMessage = `${constants.text.logging.serverPrefix} LISTEN_ERROR: port 666 is already in use`;
        expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });

      should('invoke callback', () => {

        expect(callbackInvoked).to.equal(true);
      });
    });

    withScenario('Generic Error', () => {

      let result;

      before(() => {

        stubError.code = 'SOME_GENERIC_ERROR';

        try {
          onError(undefined, undefined, stubError, undefined);
        } catch (error) {
          result = error;
        }
      });

      after(() => {

        resetStubs();
      });

      should('throw the error', () => {

        expect(result).to.equal(stubError);
      });
    });
  });
});