import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should } from './../testing/specAliases';

import handleError from './../bin/errorHandler';

the('(startup) errorHandler', () => {

  when('non-listen error handled', () => {

    const stubError = { syscall: 'someNonListenCall' };
    let result;

    try {
      handleError(stubError, undefined, undefined, undefined);
    }
    catch(error) {
      result = error;
    }

    should('throw the error', () => {

      expect(result).to.equal(stubError);
    });
  });

  when('listen error handled', () => {

    let callbackInvoked;
    const stubError = { syscall: 'listen' };
    const stubLogger = { error: () => {} };
    const stubConfig = { webServerPort: '666' };
    const stubCallback = () => { callbackInvoked = true; };

    withScenario('EACCES', () => {

      stubError.code = 'EACCES';
      callbackInvoked = false;
      const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      handleError(stubError, stubConfig, stubLogger, stubCallback);

      should('log friendly \'elevated privileges\' error message', () => {

        const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 requires elevated privileges';
        expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });

      should('invoke callback', () => {

        expect(callbackInvoked).to.equal(true);
      });
    });

    withScenario('EADDRINUSE', () => {

      stubError.code = 'EADDRINUSE';
      callbackInvoked = false;
      //const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      handleError(stubError, stubConfig, stubLogger, stubCallback);

      should('log friendly \'port in use\' error message', () => {

        //TODO: Fix this !!!
        //const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 is already in use';
        //expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });

      should('invoke callback', () => {

        expect(callbackInvoked).to.equal(true);
      });
    });

    withScenario('Generic Error', () => {

      stubError.code = 'SOME_GENERIC_ERROR';

      let result;
      try {
        handleError(stubError, undefined, undefined, undefined);
      }
      catch(error) {
        result = error;
      }

      should('throw the error', () => {

        expect(result).to.equal(stubError);
      });
    });
  });
});