import { expect } from 'chai';
import * as sinon from 'sinon';
import path from 'path';

import { the, should, when } from './../../packages/testing/aliases';
import { createStubObject, getStubApp } from './../../packages/testing/fakes';
import { assertWasCalled, assertCall } from './../../packages/testing/assertions';

import initialiseContent, { __RewireAPI__ as ContentAPI } from './../../src/server/middleware/content';

the('content middleware initialiser', () => {

  const stubCompressionResult = {};
  const stubCompression = sinon.stub().returns(stubCompressionResult);
  const stubExpress = createStubObject('static');
  const stubExpressStaticResult = {};
  const stubExpressStatic = sinon.stub(stubExpress, 'static').returns(stubExpressStaticResult);
  const stubApp = getStubApp();
  const stubAppUse = sinon.spy(stubApp, 'use');

  before(() => {

    ContentAPI.__Rewire__('compression', stubCompression);
    ContentAPI.__Rewire__('express', stubExpress);
  });

  after(() => {

    ContentAPI.__ResetDependency__('compression');
    ContentAPI.__ResetDependency__('express');
  });


  when('invoked with valid app instance', () => {

    before(() => {

      initialiseContent(stubApp);
    });

    should('initialise compression middleware', () => {

      assertCall(stubAppUse, 0, stubCompressionResult);
    });

    should('initialise static serving of /public folder', () => {

      const expectedPublicPath = path.join(__dirname, '../../src/server/public');

      assertWasCalled(stubExpressStatic, expectedPublicPath);
      assertCall(stubAppUse, 1, stubExpressStaticResult);
    });
  });
});