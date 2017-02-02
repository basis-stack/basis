import { expect } from 'chai';
import * as sinon from 'sinon';
import { forThe, given, when, then, and } from './../testing/specAliases';

import { ErrorsController } from './../controllers/errorsController';

forThe('ErrorsController', () => {

   given('404', () => {

      when('handled', () => {

         const stubNextCallback = sinon.spy();

         new ErrorsController({}, {}).handle404({}, {}, stubNextCallback);
         const result = stubNextCallback.args[0][0];

         then('error status should equal 404', () => {

            expect(result.status).to.equal(404);
         });

         and('error message should equal Resource Not Found', () => {

            expect(result.message).to.equal('Resource Not Found');
         });

         and('error should be forwarded on to next handler', () => {

            expect(stubNextCallback.calledOnce).to.equal(true);
         });
      });
   });

   given('HTTP Error', () => {

      when('error handled', () => {

         const stubResponse = { status: () => {}, send: () => {} };
         const statusSpy = sinon.spy(stubResponse, 'status');
         const sendSpy = sinon.spy(stubResponse, 'send');
         const stubError = { status: 403, message: 'Some HTTP Error' };
         const stubLogger = { error: () => {} };
         const stubConfig = { env: 'local' };
         const loggerErrorSpy = sinon.spy(stubLogger, 'error');

         new ErrorsController(stubLogger, stubConfig).handleServerError(stubError, {}, stubResponse, {});

         then('response status should equal HTTP error code', () => {

            expect(statusSpy.calledWithExactly(403)).to.equal(true);
         });

         and('response body should contain error message', () => {

            expect(sendSpy.args[0][0].message).to.equal('Some HTTP Error');
         });

         and('error should be logged', () => {

            const expectedMessage = '[EXPRESS] SERVER_ERROR: 403 - Some HTTP Error';
            expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
         });
      });
   });

   given('General Error', () => {

      when('error handled', () => {

         const stubResponse = { status: () => {}, send: () => {} };
         const statusSpy = sinon.spy(stubResponse, 'status');
         const sendSpy = sinon.spy(stubResponse, 'send');
         const stubError = { message: 'Some General Error' };
         const stubLogger = { error: () => {} };
         const stubConfig = { env: 'local' };
         const loggerErrorSpy = sinon.spy(stubLogger, 'error');

         new ErrorsController(stubLogger, stubConfig).handleServerError(stubError, {}, stubResponse, {});

         then('response status should equal 500', () => {

            expect(statusSpy.calledWithExactly(500)).to.equal(true);
         });

         and('response body should contain error message', () => {

            expect(sendSpy.args[0][0].message).to.equal('Some General Error');
         });

         and('error should be logged', () => {

            const expectedMessage = '[EXPRESS] SERVER_ERROR: 500 - Some General Error';
            expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
         });
      });
   });

   // TOOD: Add tests for production env (i.e. no stack trace)
});