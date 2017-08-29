import * as sinon from 'sinon';
import path from 'path';

import { the, should, when,
         createStubObject, getStubApp,
         assertWasCalled, assertCall } from './../../testing';

import initialiseContent, { __RewireAPI__ as ContentAPI } from './../src/middleware/content';

the('content middleware initialiser', () => {

  const stubCompressionResult = {};
  const stubCompression = sinon.stub().returns(stubCompressionResult);
  const stubExpress = createStubObject('static');
  const stubExpressStaticResult = {};
  const stubExpressStatic = sinon.stub(stubExpress, 'static').returns(stubExpressStaticResult);
  const stubApp = getStubApp();
  const stubAppUse = sinon.spy(stubApp, 'use');
  const stubGetRootPath = sinon.stub().returns('somepath');

  before(() => {

    ContentAPI.__Rewire__('compression', stubCompression);
    ContentAPI.__Rewire__('express', stubExpress);
    ContentAPI.__Rewire__('getRootPath', stubGetRootPath);
  });

  after(() => {

    ContentAPI.__ResetDependency__('compression');
    ContentAPI.__ResetDependency__('express');
    ContentAPI.__ResetDependency__('getRootPath');
  });


  when('invoked with valid app instance', () => {

    before(() => {

      initialiseContent(stubApp);
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