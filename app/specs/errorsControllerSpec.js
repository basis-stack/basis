import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should} from './../testing/specAliases';

import { ErrorsController } from './../controllers/errorsController';

the('ErrorsController', () => {

  when('error handled', () => {

    withScenario('404', () => {

      const stubNextCallback = sinon.spy();

      new ErrorsController({}, {}).handle404({}, {}, stubNextCallback);
      const result = stubNextCallback.args[0][0];

      should('set error status to 404', () => {

        expect(result.status).to.equal(404);
      });

      should('set error message to \'Resource Not Found\'', () => {

        expect(result.message).to.equal('Resource Not Found');
      });

      should('forward error on to next handler', () => {

        expect(stubNextCallback.calledOnce).to.equal(true);
      });
    });

    withScenario('HTTP Error', () => {

      const stubResponse = { status: () => {}, send: () => {} };
      const statusSpy = sinon.spy(stubResponse, 'status');
      const sendSpy = sinon.spy(stubResponse, 'send');
      const stubError = { status: 403, message: 'Some HTTP Error' };
      const stubLogger = { error: () => {} };
      const stubConfig = { env: 'local' };
      const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      new ErrorsController(stubLogger, stubConfig).handleServerError(stubError, {}, stubResponse, {});

      should('set response status code to HTTP error code', () => {

        expect(statusSpy.calledWithExactly(403)).to.equal(true);
      });

      should('set response body to error message', () => {

        expect(sendSpy.args[0][0].message).to.equal('Some HTTP Error');
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 403 - Some HTTP Error';
        expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });
    });

    withScenario('General Error', () => {

      const stubResponse = { status: () => {}, send: () => {} };
      const statusSpy = sinon.spy(stubResponse, 'status');
      const sendSpy = sinon.spy(stubResponse, 'send');
      const stubError = { message: 'Some General Error' };
      const stubLogger = { error: () => {} };
      const stubConfig = { env: 'local' };
      const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      new ErrorsController(stubLogger, stubConfig).handleServerError(stubError, {}, stubResponse, {});

      should('set response status code to 500', () => {

        expect(statusSpy.calledWithExactly(500)).to.equal(true);
      });

      should('set response body to error message', () => {

        expect(sendSpy.args[0][0].message).to.equal('Some General Error');
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 500 - Some General Error';
        expect(loggerErrorSpy.calledWithExactly(expectedMessage)).to.equal(true);
      });
    });
  });

  // TOOD: Add tests for production env (i.e. no stack trace)
});