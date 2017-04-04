import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, should, when } from './../testing/specAliases';

import { getApp, __RewireAPI__ } from './../app';

the('app', () => {

  const stubExpressInstance = { stubExpress: true };
  const stubExpress = sinon.stub().returns(stubExpressInstance);
  const stubContainer = { initialise: () => {} };
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

    __RewireAPI__.__Rewire__('express', stubExpress);
    __RewireAPI__.__Rewire__('container', stubContainer);
    __RewireAPI__.__Rewire__('AppBuilder', stubAppBuilderClass);
  });

  after(() => {

    __RewireAPI__.__ResetDependency__('express');
    __RewireAPI__.__ResetDependency__('container');
    __RewireAPI__.__ResetDependency__('AppBuilder');
  });

  when('requested', () => {

    let stubContainerInitialise;
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

    const assertWasCalled = (spy) => {

      expect(spy.calledOnce).to.equal(true);
    }

    const assertCalledBefore = (spyA, spyB, methodA, methodB) => {

      const message = `Expected ${methodA} to be called before ${methodB}`;

      expect(spyA.calledBefore(spyB)).to.equal(true, message);
    }

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

      stubContainerInitialise = sinon.spy(stubContainer, 'initialise');
      stubAppBuilderCreate = sinon.stub(stubAppBuilderClass, 'create').returns(stubAppBuilderInstance);

      stubAppBuilderUseHandlebars = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useHandlebars).returns(stubAppBuilderInstance);
      stubAppBuilderLogRequests = sinon.stub(stubAppBuilderInstance, appBuilderMethods.logRequests).returns(stubAppBuilderInstance);
      stubAppBuilderUseBodyParser = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useBodyParser).returns(stubAppBuilderInstance);
      stubAppBuilderUseCookieParser = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useCookieParser).returns(stubAppBuilderInstance);
      stubAppBuilderUseRoutes = sinon.stub(stubAppBuilderInstance, appBuilderMethods.useRoutes).returns(stubAppBuilderInstance);
      stubAppBuilderHandleErrors = sinon.stub(stubAppBuilderInstance, appBuilderMethods.handleErrors).returns(stubAppBuilderInstance);
      stubAppBuilderTrustProxy = sinon.stub(stubAppBuilderInstance, appBuilderMethods.trustProxy).returns(stubAppBuilderInstance);
      stubAppBuilderResult = sinon.stub(stubAppBuilderInstance, appBuilderMethods.result).get(() => stubExpressInstance);

      result = getApp();
    });

    should('initialise the (dependency) container', () => {

      assertWasCalled(stubContainerInitialise);
      assertCalledBefore(stubContainerInitialise, stubAppBuilderCreate, 'container.initialise()', 'AppBuilder.create()');
    });

    should('pass an express instance to the AppBuilder', () => {

      const expressInstance = stubAppBuilderCreate.args[0][0];

      expect(expressInstance).to.equal(stubExpressInstance);
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