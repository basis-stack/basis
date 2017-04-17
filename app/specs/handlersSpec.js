import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should } from './utils/specAliases';

import { onError } from './../bin/handlers';

the('(server) handlers', () => {

  when('listening handled', () => {

    // TODO: Finish this !!
  });

  when('non-listen error handled', () => {

    const stubError = { syscall: 'someNonListenCall' };
    let result;

    try {
      onError(stubError, undefined, undefined, undefined);
    }
    catch(error) {
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

        onError(stubError, stubConfig, stubLogger, stubCallback);
      });

      after(() => {

        resetStubs();
      });

      should('log friendly \'elevated privileges\' error message', () => {

        const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 requires elevated privileges';
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

        onError(stubError, stubConfig, stubLogger, stubCallback);
      });

      after(() => {

        resetStubs();
      });

      should('log friendly \'port in use\' error message', () => {

        const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 is already in use';
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
          onError(stubError, undefined, undefined, undefined);
        }
        catch(error) {
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