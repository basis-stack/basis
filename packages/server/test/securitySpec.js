import * as sinon from 'sinon';

import { the, should, when,
         getStubApp, assertWasCalled } from './../../testing/src';

import initialiseSecurity, { __RewireAPI__ as SecurityAPI } from './../src/middleware/security';

the('security middleware initialiser', () => {

  const stubHelmetResult = {};
  const stubHelmet = sinon.stub().returns(stubHelmetResult);
  const stubApp = getStubApp();
  const stubAppUse = sinon.spy(stubApp, 'use');

  before(() => {

    SecurityAPI.__Rewire__('helmet', stubHelmet);
  });

  after(() => {

    SecurityAPI.__ResetDependency__('helmet');
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