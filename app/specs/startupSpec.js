import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../testing/specAliases';
import { assertWasCalled, assertParameter } from './../testing/specAssertions';
import { main, __RewireAPI__ as StartupAPI } from './../bin/startup';

the('startup module', () => {

  const stubContainer = { initialise: () => {} };
  const stubCreateServer = sinon.spy();
  const stubContainerInitialise = sinon.stub(stubContainer, 'initialise').returns(stubContainer);

  before(() => {

    StartupAPI.__Rewire__('container', stubContainer);
    StartupAPI.__Rewire__('startServer', stubCreateServer);

    main();
  });

  after(() => {

    stubContainerInitialise.restore();

    StartupAPI.__ResetDependency__('container');
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