import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../testing/specAliases';
import { assertWasCalled, assertParameter } from './../testing/specAssertions';
import { main, __RewireAPI__ as StartupAPI } from './../bin/startup';

the('startup module', () => {

  const stubContainer = { initialise: () => {} };
  const stubGetContainer = sinon.stub().returns(stubContainer);
  const stubContainerInitialise = sinon.stub(stubContainer, 'initialise').returns(stubContainer);
  const stubCreateServer = sinon.spy();

  before(() => {

    StartupAPI.__Rewire__('getContainer', stubGetContainer);
    StartupAPI.__Rewire__('startServer', stubCreateServer);

    main();
  });

  after(() => {

    stubContainerInitialise.restore();

    StartupAPI.__ResetDependency__('getContainer');
    StartupAPI.__ResetDependency__('startServer');
  });

  when('main() executed', () => {

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