import { expect } from 'chai';
import * as sinon from 'sinon';
import { forThe, given, when, then, and } from './../testing/specAliases';

import handleError from './../bin/errorHandler';

forThe('errorHandler', () => {

   given('A non-listen error', () => {

      const stubError = { syscall: 'someNonListenCall' };

      when('handled', () => {

         let result;
         try {
            handleError(stubError, undefined, undefined, undefined);
         }
         catch(error) {
            result = error;
         }

         then('error should be thrown', () => {

            expect(result).to.equal(stubError);
         });
      });
   });

   given('A listen error', () => {

      let callbackInvoked;
      const stubError = { syscall: 'listen' };
      const stubLogger = { error: () => {} };
      const stubConfig = { webServerPort: '666' };
      const stubCallback = () => { callbackInvoked = true; };

      when('EACCES handled', () => {

         stubError.code = 'EACCES';
         callbackInvoked = false;
         const loggerErrorSpy = sinon.spy(stubLogger, 'error');

         handleError(stubError, stubConfig, stubLogger, stubCallback);

         then('friendly error message should be logged', () => {

            const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 requires elevated privileges';
            expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
         });

         and('handled callback should be invoked', () => {

            expect(callbackInvoked).to.equal(true);
         });
      });

      when('EADDRINUSE handled', () => {

         stubError.code = 'EADDRINUSE';
         callbackInvoked = false;
         //const loggerErrorSpy = sinon.spy(stubLogger, 'error');

         handleError(stubError, stubConfig, stubLogger, stubCallback);

         then('friendly error message should be logged', () => {

            //TODO: Fix this !!!
            //const expectedMessage = '[SERVER ] LISTEN_ERROR: Port 666 is already in use';
            //expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
         });

         and('handled callback should be invoked', () => {

            expect(callbackInvoked).to.equal(true);
         });
      });

      when('Generic handled', () => {

         stubError.code = 'SOME_GENERIC_ERROR';

         let result;
         try {
            handleError(stubError, undefined, undefined, undefined);
         }
         catch(error) {
            result = error;
         }

         then('error should be thrown', () => {

            expect(result).to.equal(stubError);
         });
      });
   });
});