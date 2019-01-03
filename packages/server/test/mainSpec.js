import { expect } from 'chai';
import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when, withScenario,
         assertWasCalled, assertParameter } from '../../testing/src';

the('main (startup) module', () => {

  const stubContainer = { initialise: () => {} };
  const stubGetContainer = sinon.stub().returns(stubContainer);
  const stubContainerInitialise = sinon.stub(stubContainer, 'initialise').returns(stubContainer);
  const stubHttpServer = {};
  const stubSocketServer = {};
  const stubStartHttpServer = sinon.stub().returns(stubHttpServer);
  const stubStartSocketServer = sinon.stub().returns(stubSocketServer);
  const stubModules = [{
    key: 'moduleA', initRoutes: () => {}
  }, {
    key: 'moduleB', initRoutes: () => {}, initChannels: () => {}
  }, {
    key: 'moduleC', initChannels: () => {}
  }];
  const stubGetModules = sinon.stub().returns(stubModules);

  let main;

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      '../core/container': stubGetContainer,
      '../core/moduleLoader': stubGetModules,
      './httpServer': stubStartHttpServer,
      './socketServer': stubStartSocketServer
    };

    main = proxyquire('../src/bin/main', mocks).default;
  });

  when('executed', () => {

    withScenario('valid routes and channels', () => {

      before(() => {

        main();
      });

      after(() => {

        stubStartSocketServer.reset();
      });

      should('initialise the (dependency) container', () => {

        assertWasCalled(stubContainerInitialise);
      });

      should('load all feature modules', () => {

        assertWasCalled(stubGetModules, stubContainer);
      });

      should('pass the container & routes to httpServer and start it', () => {

        const expectedRoutes = stubModules.filter(m => m.initRoutes !== undefined)
                                          .map(m => ({ moduleKey: m.key, init: m.initRoutes }));

        assertParameter(stubStartHttpServer, 0, stubContainer);
        assertParameter(stubStartHttpServer, 1, expectedRoutes, true);
        assertWasCalled(stubStartHttpServer);
      });

      should('pass container, httpServer & channels to socketServer and start it', () => {

        const expectedChannels = stubModules.filter(m => m.initChannels !== undefined)
                                            .map(m => ({ moduleKey: m.key, init: m.initChannels }));

        assertParameter(stubStartSocketServer, 0, stubContainer);
        assertParameter(stubStartSocketServer, 1, stubHttpServer);
        assertParameter(stubStartSocketServer, 2, expectedChannels, true);
        assertWasCalled(stubStartSocketServer);
      });
    });

    withScenario('no channels present', () => {

      before(() => {

        main([]);
      });

      after(() => {

        stubStartSocketServer.reset();
      });

      should('not start the socketServer', () => {

        expect(stubStartSocketServer.notCalled).to.equal(true);
      });
    });
  });
});