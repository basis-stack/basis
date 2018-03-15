import * as sinon from 'sinon';

import { the, should, when,
         createStubObject, getStubApp, getStubContainer, getStubLogger,
         assertCall, assertWasCalled, assertParameter } from './../../testing';

import initRoutes, { __RewireAPI__ as RoutesIndexAPI } from './../src/middleware/routes';

the('routes middleware', () => {

  const stubRouter = {};
  const stubExpress = createStubObject('Router');
  const stubApp = getStubApp();
  const stubLogger = getStubLogger();
  const stubRouteA = { init: () => {}, moduleKey: 'moduleA' };
  const stubRouteB = { init: () => {}, moduleKey: 'moduleB' };
  const stubRoutes = [stubRouteA, stubRouteB];
  const stubContainer = getStubContainer({}, stubLogger);

  before(() => {

    RoutesIndexAPI.__Rewire__('express', stubExpress);
  });

  after(() => {

    RoutesIndexAPI.__ResetDependency__('express');
  });

  when('invoked with a valid app instance & valid routes', () => {

    let stubExpressRouter;
    let stubLoggerInfo;
    let stubAppUse;
    let stubRouteAInit;
    let stubRouteBInit;

    before(() => {

      stubExpressRouter = sinon.stub(stubExpress, 'Router').returns(stubRouter);
      stubLoggerInfo = sinon.stub(stubLogger, 'info');
      stubAppUse = sinon.spy(stubApp, 'use');
      stubRouteAInit = sinon.spy(stubRouteA, 'init');
      stubRouteBInit = sinon.spy(stubRouteB, 'init');

      initRoutes(stubApp, stubContainer, stubRoutes);
    });

    should('initialise the express router', () => {

      assertWasCalled(stubExpressRouter);
    });

    should('initialise all routes', () => {

      assertParameter(stubRouteAInit, 0, stubRouter);
      assertParameter(stubRouteAInit, 1, stubContainer);
      assertParameter(stubRouteBInit, 0, stubRouter);
      assertParameter(stubRouteBInit, 1, stubContainer);
    });

    should('log an initialised info message for each route (module)', () => {

      assertCall(stubLoggerInfo, 0, '[STARTUP] INIT: wired routes for module \'moduleA\'');
      assertCall(stubLoggerInfo, 1, '[STARTUP] INIT: wired routes for module \'moduleB\'');
    });

    should('wire up the express router to the app', () => {

      assertWasCalled(stubAppUse, stubRouter);
    });
  });
});