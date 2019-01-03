import * as sinon from 'sinon';
import path from 'path';
import proxyquire from 'proxyquire';

import { the, should, when,
         createStubObject, getStubApp,
         assertWasCalled, assertCall } from '../../testing/src';

the('content middleware initialiser', () => {

  let initContent;
  const stubCompressionResult = {};
  const stubCompression = sinon.stub().returns(stubCompressionResult);
  const stubExpress = createStubObject('static');
  const stubExpressStaticResult = {};
  const stubExpressStatic = sinon.stub(stubExpress, 'static').returns(stubExpressStaticResult);
  const stubApp = getStubApp();
  const stubAppUse = sinon.spy(stubApp, 'use');
  const stubGetRootPath = sinon.stub().returns('somepath');

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      compression: stubCompression,
      express: stubExpress,
      '../core/utilities': { getRootPath: stubGetRootPath }
    };

    initContent = proxyquire('../src/middleware/content', mocks).default;
  });

  when('invoked with valid app instance', () => {

    before(() => {

      initContent(stubApp);
    });

    should('initialise compression middleware', () => {

      assertCall(stubAppUse, 0, stubCompressionResult);
    });

    should('initialise static serving of /public folder', () => {

      const expectedPublicPath = path.join('somepath', 'public');

      assertWasCalled(stubExpressStatic, expectedPublicPath);
      assertCall(stubAppUse, 1, stubExpressStaticResult);
    });
  });
});