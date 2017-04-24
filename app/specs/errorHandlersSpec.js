import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, withScenario, should } from './utils/specAliases';
import { createStubObject, getStubResponse } from './utils/fakes';
import { assertWasCalled, assertParameter } from './utils/specAssertions';

import { handle404, handleServerError } from './../middleware/errorHandlers';

the('errorHandlers middleware', () => {

  when('error handled', () => {

    withScenario('404', () => {

      const stubNextCallback = sinon.spy();

      handle404({}, {}, stubNextCallback);
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

      const stubResponse = getStubResponse();
      const statusSpy = sinon.spy(stubResponse, 'status');
      const renderSpy = sinon.spy(stubResponse, 'render');
      const stubError = { status: 403, message: 'Some HTTP Error' };
      const stubLogger = createStubObject('error');
      const stubConfig = { env: 'local' };
      const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      handleServerError(stubConfig, stubLogger, stubError, {}, stubResponse, {});

      should('set response status code to HTTP error code', () => {

        assertWasCalled(statusSpy, 403);
      });

      should('set render the error page with error details', () => {

        const result = renderSpy.args[0][1];

        assertParameter(renderSpy, 0, 'error');
        expect(result.status).to.equal(stubError.status);
        expect(result.message).to.equal(stubError.message);
        expect(result.error).to.not.be.undefined;
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 403 - Some HTTP Error';

        assertWasCalled(loggerErrorSpy, expectedMessage);
      });
    });

    withScenario('General Error', () => {

      const stubResponse = getStubResponse();
      const statusSpy = sinon.spy(stubResponse, 'status');
      const renderSpy = sinon.spy(stubResponse, 'render');
      const stubError = { message: 'Some General Error' };
      const stubLogger = createStubObject('error');
      const stubConfig = { env: 'local' };
      const loggerErrorSpy = sinon.spy(stubLogger, 'error');

      handleServerError(stubConfig, stubLogger, stubError, {}, stubResponse, {});

      should('set response status code to 500', () => {

        assertWasCalled(statusSpy, 500);
      });

      should('set render the error page with error details', () => {

        const result = renderSpy.args[0][1];

        assertParameter(renderSpy, 0, 'error');
        expect(result.status).to.equal(500);
        expect(result.message).to.equal(stubError.message);
        expect(result.error).to.not.be.undefined;
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 500 - Some General Error';

        assertWasCalled(loggerErrorSpy, expectedMessage);
      });
    });

    withScenario('Production config', () => {

      const stubResponse = getStubResponse();
      const renderSpy = sinon.spy(stubResponse, 'render');
      const stubError = { message: 'Some General Error in Production' };
      const stubLogger = createStubObject('error');
      const stubConfig = { env: 'production' };

      handleServerError(stubConfig, stubLogger, stubError, {}, stubResponse, {});

      should('not include the Error object / details', () => {

        const result = renderSpy.args[0][1];

        expect(result.error).to.deep.equal({});
      });
    });
  });
});