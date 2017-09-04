import * as sinon from 'sinon';

import { the, should, when,
         createStubObject, assertParameter } from 'basis-testing';

import homeIndex, { __RewireAPI__ as HomeIndexAPI } from './../../src/server/routes/home';

the('home index', () => {

  const stubHomeControllerClass = createStubObject('initialise');
  const stubRouter = {};
  const stubContainer = {};

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

      homeIndex(stubRouter, stubContainer);
    });

    should('initialise the HomeController', () => {

      assertParameter(stubHomeControllerInitialise, 0, stubRouter);
      assertParameter(stubHomeControllerInitialise, 1, stubContainer);
    });
  });
});