import * as sinon from 'sinon';

import { the, should, when,
         assertWasCalled, assertParameter } from './../../testing';

import main, { __RewireAPI__ as MainAPI } from './../src/bin/main';

the('main (startup) module', () => {

  const stubContainer = { initialise: () => {} };
  const stubGetContainer = sinon.stub().returns(stubContainer);
  const stubContainerInitialise = sinon.stub(stubContainer, 'initialise').returns(stubContainer);
  const stubModules = [{
    key: 'moduleA',
    initRoutes: () => {}
  }, {
    key: 'moduleB',
    initRoutes: () => {}
  }, {
    key: 'moduleC'
  }];
  const stubGetModules = sinon.stub().returns(stubModules);
  const stubHttpServer = {};
  const stubCreateServer = sinon.stub().returns(stubHttpServer);

  before(() => {

    MainAPI.__Rewire__('getContainer', stubGetContainer);
    MainAPI.__Rewire__('getModules', stubGetModules);
    MainAPI.__Rewire__('startHttpServer', stubCreateServer);

    main();
  });

  after(() => {

    stubContainerInitialise.restore();

    MainAPI.__ResetDependency__('getContainer');
    MainAPI.__ResetDependency__('getModules');
    MainAPI.__ResetDependency__('startHttpServer');
  });

  when('executed', () => {

    should('initialise the (dependency) container', () => {

      assertWasCalled(stubContainerInitialise);
    });

    should('load all feature modules', () => {

      assertWasCalled(stubGetModules, stubContainer);
    });

    should('pass the initialised container to httpServer', () => {

      assertParameter(stubCreateServer, 0, stubContainer);
    });

    should('pass routes to httpServer', () => {

      const expectedResult = stubModules.filter(m => m.initRoutes !== undefined)
                                        .map(m => ({ moduleKey: m.key, init: m.initRoutes }));

      assertParameter(stubCreateServer, 1, expectedResult, true);
    });

    should('start the server', () => {

      assertWasCalled(stubCreateServer);
    });
  });
});