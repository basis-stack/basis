import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when,
         getStubApp, assertWasCalled } from '../../testing/src';

the('security middleware initialiser', () => {

  const stubHelmetResult = {};
  const stubHelmet = sinon.stub().returns(stubHelmetResult);
  const stubApp = getStubApp();
  const stubAppUse = sinon.spy(stubApp, 'use');

  let initialiseSecurity;

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      helmet: stubHelmet
    };

    initialiseSecurity = proxyquire('../src/middleware/security', mocks).default;
  });

  when('invoked with valid app instance', () => {

    before(() => {

      initialiseSecurity(stubApp);
    });

    should('initialise helmet middleware', () => {

      assertWasCalled(stubAppUse, stubHelmetResult);
    });
  });
});