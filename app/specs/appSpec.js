import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../testing/specAliases';
import { assertWasCalled, assertParameter, assertCalledBefore } from './../testing/specAssertions';
import { default as createApp, __RewireAPI__ as CreateAppAPI } from './../app';

the('app', () => {

  const stubExpressInstance = { stubExpress: true };
  const stubExpress = sinon.stub().returns(stubExpressInstance);
  const stubContainer = { stubContainer: true };
  const stubAppBuilderClass = { create: () => {} };

  const stubAppBuilderInstance = {
    stubAppBuilder: true,
    useHandlebars: () => {},
    logRequests: () => {},
    useBodyParser: () => {},
    useCookieParser: () => {},
    useRoutes: () => {},
    handleErrors: () => {},
    trustProxy: () => {},
    result: {}
  };

  before(() => {

    CreateAppAPI.__Rewire__('express', stubExpress);
    CreateAppAPI.__Rewire__('AppBuilder', stubAppBuilderClass);
  });

  after(() => {

    CreateAppAPI.__ResetDependency__('express');
    CreateAppAPI.__ResetDependency__('AppBuilder');
  });

  when('created', () => {

    let stubAppBuilderCreate;

    let stubAppBuilderUseHandlebars;
    let stubAppBuilderLogRequests;
    let stubAppBuilderUseBodyParser;
    let stubAppBuilderUseCookieParser;
    let stubAppBuilderUseRoutes;
    let stubAppBuilderHandleErrors;
    let stubAppBuilderTrustProxy;
    let stubAppBuilderResult;

    let result;

    const appBuilderMethods = {
      useHandlebars: 'useHandlebars',
      logRequests: 'logRequests',
      useBodyParser: 'useBodyParser',
      useCookieParser: 'useCookieParser',
      useRoutes: 'useRoutes',
      handleErrors: 'handleErrors',
      trustProxy: 'trustProxy',
      result: 'result'
    };

    before(() => {

      stubAppBuilderCreate = sinon.stub(stubAppBuilderClass, 'create').returns(stubAppBuilderInstance);

      stubAppBuilderUseHandlebars = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useHandlebars).returns(stubAppBuilderInstance);
      stubAppBuilderLogRequests = sinon.stub(stubAppBuilderInstance, appBuilderMethods.logRequests).returns(stubAppBuilderInstance);
      stubAppBuilderUseBodyParser = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useBodyParser).returns(stubAppBuilderInstance);
      stubAppBuilderUseCookieParser = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useCookieParser).returns(stubAppBuilderInstance);
      stubAppBuilderUseRoutes = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useRoutes).returns(stubAppBuilderInstance);
      stubAppBuilderHandleErrors = sinon.stub(stubAppBuilderInstance, appBuilderMethods.handleErrors).returns(stubAppBuilderInstance);
      stubAppBuilderTrustProxy = sinon.stub(stubAppBuilderInstance, appBuilderMethods.trustProxy).returns(stubAppBuilderInstance);
      stubAppBuilderResult = sinon.stub(stubAppBuilderInstance, appBuilderMethods.result).get(() => stubExpressInstance);

      result = createApp(stubContainer);
    });

    should('pass the container and an express instance to the AppBuilder', () => {

      assertParameter(stubAppBuilderCreate, 0, stubContainer);
      assertParameter(stubAppBuilderCreate, 1, stubExpressInstance);
    });

    should('set handlebars as view engine', () => {

      assertWasCalled(stubAppBuilderUseHandlebars);
      assertCalledBefore(stubAppBuilderUseHandlebars, stubAppBuilderLogRequests, appBuilderMethods.useHandlebars, appBuilderMethods.logRequests);
    });

    should('log HTTP requests (using morgan or similar)', () => {

      assertWasCalled(stubAppBuilderLogRequests);
      assertCalledBefore(stubAppBuilderLogRequests, stubAppBuilderUseBodyParser, appBuilderMethods.logRequests, appBuilderMethods.useBodyParser);
    });

    should('use the body parser', () => {

      assertWasCalled(stubAppBuilderUseBodyParser);
      assertCalledBefore(stubAppBuilderUseBodyParser, stubAppBuilderUseCookieParser, appBuilderMethods.useBodyParser, appBuilderMethods.useCookieParser);
    });

    should('use the cookie parser', () => {

      assertWasCalled(stubAppBuilderUseCookieParser);
      assertCalledBefore(stubAppBuilderUseCookieParser, stubAppBuilderUseRoutes, appBuilderMethods.useCookieParser, appBuilderMethods.useRoutes);
    });

    should('initialise app routes', () => {

      assertWasCalled(stubAppBuilderUseRoutes);
      assertCalledBefore(stubAppBuilderUseRoutes, stubAppBuilderHandleErrors, appBuilderMethods.useRoutes, appBuilderMethods.handleErrors);
    });

    should('handle errors (and 404s)', () => {

      assertWasCalled(stubAppBuilderHandleErrors);
      assertCalledBefore(stubAppBuilderHandleErrors, stubAppBuilderTrustProxy, appBuilderMethods.handleErrors, appBuilderMethods.trustProxy);
    });

    should('enable \'trust proxy\' setting', () => {

      assertWasCalled(stubAppBuilderTrustProxy);
      assertCalledBefore(stubAppBuilderTrustProxy, stubAppBuilderResult, appBuilderMethods.trustProxy, appBuilderMethods.result);
    });

    should('return the express instance', () => {

      expect(result).to.equal(stubExpressInstance);
    });
  });
});