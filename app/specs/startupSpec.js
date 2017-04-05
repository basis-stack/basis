import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, should, when } from './../testing/specAliases';

import { main, __RewireAPI__ as StartupAPI } from './../bin/startup';

the('startup module', () => {

  const stubContainer = { initialise: () => {} };
  const stubCreateServer = sinon.stub();
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

      expect(stubContainerInitialise.calledOnce).to.equal(true);
    });

    should('pass the initialised container to startServer', () => {

      const result = stubCreateServer.args[0][0];

      expect(result).to.equal(stubContainer);
    });

    should('start the server', () => {

      expect(stubCreateServer.calledOnce).to.equal(true);
    });
  });
});