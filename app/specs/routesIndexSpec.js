import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { assertWasCalled } from './utils/specAssertions';
import { createStubObject, getStubApp } from './utils/fakes';
import routesIndex, { __RewireAPI__ as RoutesIndexAPI } from './../routes';

the('routes index', () => {

  const stubFs = createStubObject('readdirSync');
  const stubRouter = {};
  const stubExpress = createStubObject('Router');
  const stubApp = getStubApp();

  sinon.stub(stubFs, 'readdirSync').returns([]);

  before(() => {

    RoutesIndexAPI.__Rewire__('express', stubExpress);
    RoutesIndexAPI.__Rewire__('fs', stubFs);
  });

  after(() => {

    RoutesIndexAPI.__ResetDependency__('express');
    RoutesIndexAPI.__ResetDependency__('fs');
  });

  when('invoked with a valid app instance', () => {

    let stubExpressRouter;
    let stubAppUse;

    let result;

    before(() => {

      stubExpressRouter = sinon.stub(stubExpress, 'Router').returns(stubRouter);
      stubAppUse = sinon.spy(stubApp, 'use');

      result = routesIndex(stubApp);
    });

    should('initialise the express router', () => {

      assertWasCalled(stubExpressRouter);
    });

    should('wire up the express router', () => {

      assertWasCalled(stubAppUse, stubRouter);
    });
  });
});