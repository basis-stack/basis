import { expect } from 'chai';
import * as sinon from 'sinon';
import HTTPStatus from 'http-status';

import { the, when, withScenario, should,
         createStubObject, getStubResponse, getStubApp,
         assertWasCalled, assertParameter } from './../../testing';

import initialiseErrorHandlers, { __RewireAPI__ as ErrorHandlersAPI } from './../src/middleware/errorHandlers';

the('errorHandlers middleware', () => {

  const stubConfig = { shared: { env: 'local' } };
  const stubLogger = createStubObject('error');
  const stubErrorView = {};
  const stubRenderView = sinon.spy();

  const initialiseAndGetHandlers = (config = stubConfig) => {

    const stubApp = getStubApp();
    const stubAppUse = sinon.spy(stubApp, 'use');

    initialiseErrorHandlers(stubApp, config, stubLogger);

    return {
      notFoundHandler: stubAppUse.args[0][0],
      errorHandler: stubAppUse.args[1][0]
    };
  };

  before(() => {

    ErrorHandlersAPI.__Rewire__('ErrorView', stubErrorView);
    ErrorHandlersAPI.__Rewire__('renderView', stubRenderView);
  });

  after(() => {

    ErrorHandlersAPI.__ResetDependency__('ErrorView');
    ErrorHandlersAPI.__ResetDependency__('renderView');
  });

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

    should('set error message to appropriate not found message', () => {

      expect(result.message).to.equal('The requested URL was not found on this server');
    });

    should('forward error on to next handler', () => {

      expect(stubNextCallback.calledOnce).to.equal(true);
    });
  });

  when('error handled', () => {

    const stubResponse = getStubResponse();
    const statusSpy = sinon.spy(stubResponse, 'status');
    const loggerErrorSpy = sinon.spy(stubLogger, 'error');

    const reset = () => {

      statusSpy.resetHistory();
      stubRenderView.resetHistory();
      loggerErrorSpy.resetHistory();
    };

    const assertRenderView = (expectedTitle, expectedDetail) => {

      assertParameter(stubRenderView, 2, expectedTitle);
      assertParameter(stubRenderView, 4, expectedDetail, true);
    };

    withScenario('HTTP Error', () => {

      const status = 403;
      const stubError = { status, message: 'Some HTTP Error' };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('set response status code to HTTP error code', () => {

        assertWasCalled(statusSpy, status);
      });

      should('render the error page with error details', () => {

        const statusText = HTTPStatus[status];
        const expectedTitle = `Error ${status} (${statusText})`;
        const expectedDetail = {
          status,
          statusText,
          title: expectedTitle,
          message: stubError.message,
          error: stubError
        };

        assertRenderView(expectedTitle, expectedDetail);
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 403 - Some HTTP Error';

        assertWasCalled(loggerErrorSpy, expectedMessage);
      });
    });

    withScenario('General Error', () => {

      const status = 500;
      const stubError = { message: 'Some General Error' };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('set response status code to 500', () => {

        assertWasCalled(statusSpy, status);
      });

      should('render the error page with error details', () => {

        const statusText = HTTPStatus[status];
        const expectedTitle = `Error ${status} (${statusText})`;
        const expectedDetail = {
          status,
          statusText,
          title: expectedTitle,
          message: stubError.message,
          error: stubError
        };

        assertRenderView(expectedTitle, expectedDetail);
      });

      should('log the error', () => {

        const expectedMessage = '[EXPRESS] SERVER_ERROR: 500 - Some General Error';

        assertWasCalled(loggerErrorSpy, expectedMessage);
      });
    });

    withScenario('Production config', () => {

      const stubError = { message: 'Some General Error in Production' };
      const stubProdConfig = { shared: { env: 'production' } };

      before(() => {

        initialiseAndGetHandlers(stubProdConfig).errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('not include the Error object / details', () => {

        const statusText = HTTPStatus[500];
        const expectedTitle = `Error 500 (${statusText})`;
        const expectedDetail = {
          status: 500,
          statusText,
          title: expectedTitle,
          message: stubError.message,
          error: {}
        };

        assertRenderView(expectedTitle, expectedDetail);
      });
    });

    withScenario('not found', () => {

      const status = 404;
      const stubError = { status };

      before(() => {

        initialiseAndGetHandlers().errorHandler(stubError, {}, stubResponse, {});
      });

      after(() => {

        reset();
      });

      should('not include the Error object / details', () => {

        const statusText = HTTPStatus[status];
        const expectedTitle = `Error ${status} (${statusText})`;
        const expectedDetail = {
          status,
          statusText,
          title: expectedTitle,
          message: stubError.message,
          error: {}
        };

        assertRenderView(expectedTitle, expectedDetail);
      });
    });
  });
});