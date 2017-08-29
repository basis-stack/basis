import * as sinon from 'sinon';

import { the, should, when,
         createStubObject, assertWasCalled } from 'basis-testing';

import homeIndex, { __RewireAPI__ as HomeIndexAPI } from './../../src/server/routes/home';

the('home index', () => {

  const stubHomeControllerClass = createStubObject('initialise');
  const stubRouter = {};

  before(() => {

    HomeIndexAPI.__Rewire__('HomeController', stubHomeControllerClass);
  });

  after(() => {

    HomeIndexAPI.__ResetDependency__('HomeController');
  });

  when('invoked with a router instance', () => {

    let stubHomeControllerInitialise;

    before(() => {

      stubHomeControllerInitialise = sinon.stub(stubHomeControllerClass, 'initialise');

      homeIndex(stubRouter);
    });

    should('initialise the HomeController', () => {

      assertWasCalled(stubHomeControllerInitialise, stubRouter);
    });
  });
});