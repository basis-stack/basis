import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { assertWasCalled } from './utils/specAssertions';
import { createStubObject } from './utils/fakes';
import { default as routesIndex,  __RewireAPI__ as RoutesIndexAPI } from './../routes';

the('routes index', () => {

  const stubRouter = {};
  const stubExpress = createStubObject(['Router']);
  const stubHomeController = createStubObject(['initialise']);

  before(() => {

    RoutesIndexAPI.__Rewire__('express', stubExpress);
    RoutesIndexAPI.__Rewire__('HomeController', stubHomeController);
  });

  after(() => {

    RoutesIndexAPI.__ResetDependency__('express');
    RoutesIndexAPI.__ResetDependency__('HomeController');
  });

  when('requested', () => {

    let stubExpressRouter;
    let stubHomeControllerInitialise;
    let result;

    before(() => {

      stubExpressRouter = sinon.stub(stubExpress, 'Router').returns(stubRouter);
      stubHomeControllerInitialise = sinon.spy(stubHomeController, 'initialise');

      result = routesIndex();
    });

    should('initialise the express router', () => {

      assertWasCalled(stubExpressRouter);
    });

    should('initialise the homeController', () => {

      assertWasCalled(stubHomeControllerInitialise, stubRouter);
    });

    should('return the router instance', () => {

      expect(result).to.equal(stubRouter);
    });
  });
});