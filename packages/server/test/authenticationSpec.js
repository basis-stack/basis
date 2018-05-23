import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when,
         createStubObject, getStubApp,
         assertCall, assertWasCalled } from './../../testing/src';

import initAuthentication, { __RewireAPI__ as AuthenticationAPI } from './../src/middleware/authentication';

the('authentication middleware initialiser', () => {

  const stubPassport = createStubObject(['use', 'initialize', 'session']);
  const stubContainer = {
    ...createStubObject('resolve'),
    instanceKeys: {
      authStrategies: 'authStrategies'
    }
  };
  const stubApp = getStubApp();
  const stubInitializeResult = {};
  const authStrategies = ['stratergyA', 'stratergyB'];

  const stubPassportUse = sinon.stub(stubPassport, 'use');
  const stubAppUse = sinon.stub(stubApp, 'use');
  sinon.stub(stubContainer, 'resolve').returns(authStrategies);
  sinon.stub(stubPassport, 'initialize').returns(stubInitializeResult);

  before(() => {

    AuthenticationAPI.__Rewire__('passport', stubPassport);
  });

  after(() => {

    AuthenticationAPI.__ResetDependency__('passport');
  });


  when('invoked with valid app instance', () => {

    let result;

    before(() => {

      result = initAuthentication(stubApp, stubContainer);
    });

    should('register all auth strategies with passport', () => {

      assertCall(stubPassportUse, 0, 'stratergyA');
      assertCall(stubPassportUse, 1, 'stratergyB');
    });

    should('initialise passport and wire to the app', () => {

      assertWasCalled(stubAppUse, stubInitializeResult);
    });

    should('return the passport instance', () => {

      expect(result).to.equal(stubPassport);
    });
  });
});