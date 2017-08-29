import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when,
         assertWasCalled, assertParameter } from './../../testing';

import main, { __RewireAPI__ as MainAPI } from './../src/bin/main';

the('main (startup) module', () => {

  const stubContainer = { initialise: () => {} };
  const stubGetContainer = sinon.stub().returns(stubContainer);
  const stubContainerInitialise = sinon.stub(stubContainer, 'initialise').returns(stubContainer);
  const stubCreateServer = sinon.spy();

  before(() => {

    MainAPI.__Rewire__('getContainer', stubGetContainer);
    MainAPI.__Rewire__('startServer', stubCreateServer);

    main();
  });

  after(() => {

    stubContainerInitialise.restore();

    MainAPI.__ResetDependency__('getContainer');
    MainAPI.__ResetDependency__('startServer');
  });

  when('executed', () => {

    should('initialise the (dependency) container ', () => {

      assertWasCalled(stubContainerInitialise);
    });

    should('pass the initialised container to startServer', () => {

      assertParameter(stubCreateServer, 0, stubContainer);
    });

    should('start the server', () => {

      assertWasCalled(stubCreateServer);
    });
  });
});