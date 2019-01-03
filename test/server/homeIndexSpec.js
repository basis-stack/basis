import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when,
         createStubObject, assertParameter } from 'basis-testing';

the('home index', () => {

  const stubHomeControllerClass = createStubObject('initialise');
  const stubRouter = {};
  const stubContainer = {};

  let homeIndex;

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      './homeController': stubHomeControllerClass
    };

    homeIndex = proxyquire('./../../src/server/modules/home', mocks).default;
  });

  when('initRoutes invoked with a router instance', () => {

    let stubHomeControllerInitialise;

    before(() => {

      stubHomeControllerInitialise = sinon.stub(stubHomeControllerClass, 'initialise');

      homeIndex.initRoutes(stubRouter, stubContainer);
    });

    should('initialise the HomeController', () => {

      assertParameter(stubHomeControllerInitialise, 0, stubRouter);
      assertParameter(stubHomeControllerInitialise, 1, stubContainer);
    });
  });
});