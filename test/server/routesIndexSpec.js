import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../../packages/testing/aliases';
import { assertWasCalled } from './../../packages/testing/assertions';
import { createStubObject, getStubApp, getStubContainer, getStubLogger } from './../../packages/testing/fakes';

import routesIndex, { __RewireAPI__ as RoutesIndexAPI } from './../../src/server/routes';

the('routes index', () => {

  const stubFs = createStubObject('readdirSync');
  const stubRouter = {};
  const stubExpress = createStubObject('Router');
  const stubDynamicImport = sinon.stub();
  const stubApp = getStubApp();
  const stubLogger = getStubLogger();
  const stubRouteA = createStubObject('default');

  before(() => {

    RoutesIndexAPI.__Rewire__('express', stubExpress);
    RoutesIndexAPI.__Rewire__('fs', stubFs);
    RoutesIndexAPI.__Rewire__('dynamicImport', stubDynamicImport);
  });

  after(() => {

    RoutesIndexAPI.__ResetDependency__('express');
    RoutesIndexAPI.__ResetDependency__('fs');
    RoutesIndexAPI.__ResetDependency__('dynamicImport');
  });

  when('invoked with a valid app instance', () => {

    let stubExpressRouter;
    let stubLoggerInfo;
    let stubLoggerWarn;
    let stubRouteADefault;
    let stubAppUse;

    before(() => {

      sinon.stub(stubFs, 'readdirSync').returns(['folderA', 'folderB', 'something.js']);
      stubExpressRouter = sinon.stub(stubExpress, 'Router').returns(stubRouter);
      stubDynamicImport.onFirstCall().returns(stubRouteA);
      stubDynamicImport.onSecondCall().throws(new Error('Some route import error'));
      stubLoggerInfo = sinon.stub(stubLogger, 'info');
      stubLoggerWarn = sinon.stub(stubLogger, 'warn');
      stubRouteADefault = sinon.stub(stubRouteA, 'default');
      stubAppUse = sinon.spy(stubApp, 'use');

      routesIndex(stubApp, getStubContainer({}, stubLogger));
    });

    should('initialise the express router', () => {

      assertWasCalled(stubExpressRouter);
    });

    should('initialise valid routes', () => {

      assertWasCalled(stubRouteADefault, stubRouter);
    });

    should('log an initialised info message for valid routes', () => {

      assertWasCalled(stubLoggerInfo, '[STARTUP] INIT: wired base route \'folderA\'');
    });

    should('log a warning message for invalid / errored routes', () => {

      assertWasCalled(stubLoggerWarn, '[STARTUP] INVALID_ROUTE: unable to initialise route \'folderB\'. Error: Some route import error');
    });

    should('wire up the express router to the app', () => {

      assertWasCalled(stubAppUse, stubRouter);
    });
  });
});