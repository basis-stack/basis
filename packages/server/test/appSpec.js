import { expect } from 'chai';
import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when,
         createStubObject,
         assertWasCalled, assertParameter, assertCalledBefore } from '../../testing/src';

the('app', () => {

  let createApp;
  const stubExpressInstance = { stubExpress: true };
  const stubExpress = sinon.stub().returns(stubExpressInstance);
  const stubContainer = { stubContainer: true };
  const stubAppBuilderClass = { create: () => {} };
  const appBuilderMethods = [
    'useEjs',
    'logRequests',
    'useDataParsers',
    'secure',
    'defaultContent',
    'useAuthentication',
    'useRoutes',
    'handleErrors',
    'trustProxy'
  ];
  const stubAppBuilderInstance = createStubObject(appBuilderMethods);
  const stubRoutes = {};

  stubAppBuilderInstance.result = {};

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      express: stubExpress,
      '../middleware/appBuilder': stubAppBuilderClass
    };

    createApp = proxyquire('../src/app', mocks).default;
  });

  when('created', () => {

    let stubAppBuilderCreate;

    let stubAppBuilderUseEjs;
    let stubAppBuilderLogRequests;
    let stubAppBuilderUseDataParsers;
    let stubAppBuilderSecure;
    let stubAppBuilderDefaultContent;
    let stubAppBuilderUseAuthentication;
    let stubAppBuilderUseRoutes;
    let stubAppBuilderHandleErrors;
    let stubAppBuilderTrustProxy;
    let stubAppBuilderResult;

    let result;

    before(() => {

      stubAppBuilderCreate = sinon.stub(stubAppBuilderClass, 'create').returns(stubAppBuilderInstance);

      stubAppBuilderUseEjs = sinon.stub(stubAppBuilderInstance, appBuilderMethods[0]).returns(stubAppBuilderInstance);
      stubAppBuilderLogRequests = sinon.stub(stubAppBuilderInstance, appBuilderMethods[1]).returns(stubAppBuilderInstance);
      stubAppBuilderUseDataParsers = sinon.stub(stubAppBuilderInstance, appBuilderMethods[2]).returns(stubAppBuilderInstance);
      stubAppBuilderSecure = sinon.stub(stubAppBuilderInstance, appBuilderMethods[3]).returns(stubAppBuilderInstance);
      stubAppBuilderDefaultContent = sinon.stub(stubAppBuilderInstance, appBuilderMethods[4]).returns(stubAppBuilderInstance);
      stubAppBuilderUseAuthentication = sinon.stub(stubAppBuilderInstance, appBuilderMethods[5]).returns(stubAppBuilderInstance);
      stubAppBuilderUseRoutes = sinon.stub(stubAppBuilderInstance, appBuilderMethods[6]).returns(stubAppBuilderInstance);
      stubAppBuilderHandleErrors = sinon.stub(stubAppBuilderInstance, appBuilderMethods[7]).returns(stubAppBuilderInstance);
      stubAppBuilderTrustProxy = sinon.stub(stubAppBuilderInstance, appBuilderMethods[8]).returns(stubAppBuilderInstance);
      stubAppBuilderResult = sinon.stub(stubAppBuilderInstance, 'result').get(() => stubExpressInstance);

      result = createApp(stubContainer, stubRoutes);
    });

    should('pass the container and an express instance to the AppBuilder', () => {

      assertParameter(stubAppBuilderCreate, 0, stubContainer);
      assertParameter(stubAppBuilderCreate, 1, stubExpressInstance);
    });

    should('set EJS as view engine', () => {

      assertWasCalled(stubAppBuilderUseEjs);
      assertCalledBefore(stubAppBuilderUseEjs, stubAppBuilderLogRequests, appBuilderMethods[0], appBuilderMethods[1]);
    });

    should('log HTTP requests (using morgan or similar)', () => {

      assertWasCalled(stubAppBuilderLogRequests);
      assertCalledBefore(stubAppBuilderLogRequests, stubAppBuilderUseDataParsers, appBuilderMethods[1], appBuilderMethods[2]);
    });

    should('use the data parsers (body & cookie)', () => {

      assertWasCalled(stubAppBuilderUseDataParsers);
      assertCalledBefore(stubAppBuilderUseDataParsers, stubAppBuilderDefaultContent, appBuilderMethods[2], appBuilderMethods[3]);
    });

    should('secure using basic security precautions', () => {

      assertWasCalled(stubAppBuilderSecure);
      assertCalledBefore(stubAppBuilderSecure, stubAppBuilderDefaultContent, appBuilderMethods[3], appBuilderMethods[4]);
    });

    should('apply default content middleware', () => {

      assertWasCalled(stubAppBuilderDefaultContent);
      assertCalledBefore(stubAppBuilderDefaultContent, stubAppBuilderUseAuthentication, appBuilderMethods[4], appBuilderMethods[5]);
    });

    should('apply the (passport) authentication middleware', () => {

      assertWasCalled(stubAppBuilderUseAuthentication);
      assertCalledBefore(stubAppBuilderUseAuthentication, stubAppBuilderUseRoutes, appBuilderMethods[4], appBuilderMethods[5]);
    });

    should('initialise app routes', () => {

      assertWasCalled(stubAppBuilderUseRoutes, stubRoutes);
      assertCalledBefore(stubAppBuilderUseRoutes, stubAppBuilderHandleErrors, appBuilderMethods[6], appBuilderMethods[7]);
    });

    should('handle errors (and 404s)', () => {

      assertWasCalled(stubAppBuilderHandleErrors);
      assertCalledBefore(stubAppBuilderHandleErrors, stubAppBuilderTrustProxy, appBuilderMethods[7], appBuilderMethods[8]);
    });

    should('enable \'trust proxy\' setting', () => {

      assertWasCalled(stubAppBuilderTrustProxy);
      assertCalledBefore(stubAppBuilderTrustProxy, stubAppBuilderResult, appBuilderMethods[8], 'result');
    });

    should('return the express instance', () => {

      expect(result).to.equal(stubExpressInstance);
    });
  });
});