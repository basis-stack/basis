import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, withScenario, should } from './utils/specAliases';
import { createStubObject, getStubResponse, getStubApp } from './utils/fakes';
import { assertWasCalled, assertParameter } from './utils/specAssertions';

import initialiseErrorHandlers from './../middleware/errorHandlers';

the('errorHandlers middleware', () => {

  const stubConfig = { env: 'local' };
  const stubLogger = createStubObject('error');

  const initialiseAndGetHandlers = (config = stubConfig) => {

    const stubApp = getStubApp();
    const stubAppUse = sinon.spy(stubApp, 'use');

    initialiseErrorHandlers(stubApp, config, stubLogger);

    return {
      notFoundHandler: stubAppUse.args[0][0],
      errorHandler: stubAppUse.args[1][0]
    };
  };

  when('invoked with a valid app instance', () => {

    const result = initialiseAndGetHandlers();

    should('wire up a \'wildcard\' handler for not-found routes', () => {

      expect(result.notFoundHandler.length).to.equal(3);
    });

    should('wire up an error handler', () => {

      expect(result.errorHandler.length).to.equal(4);
    });
  });

  when('not-found handled', () => {

    const stubNextCallback = sinon.spy();

    initialiseAndGetHandlers().notFoundHandler({}, {}, stubNextCallback);

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

  when('error handled', () => {

    const stubResponse = getStubResponse();
    const statusSpy = sinon.spy(stubResponse, 'status');
    const renderSpy = sinon.spy(stubResponse, 'render');
    const loggerErrorSpy = sinon.spy(stubLogger, 'error');

    const reset = () => {

      statusSpy.reset();
      renderSpy.reset();
      loggerErrorSpy.reset();
    };

    withScenario('HTTP Error', () => {

      const stubError = { status: 403, message: 'Some HTTP Error' };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

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

      const stubError = { message: 'Some General Error' };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

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

      const stubError = { message: 'Some General Error in Production' };
      const stubProdConfig = { env: 'production' };

      before(() => {

        initialiseAndGetHandlers(stubProdConfig).errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('not include the Error object / details', () => {

        const result = renderSpy.args[0][1];

        expect(result.error).to.deep.equal({});
      });
    });

    withScenario('not found', () => {

      const stubError = { status: 404 };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('not include the Error object / details', () => {

        const result = renderSpy.args[0][1];

        expect(result.error).to.deep.equal({});
      });
    });
  });
});