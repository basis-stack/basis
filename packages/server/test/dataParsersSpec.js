import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when,
         createStubObject, getStubApp,
         assertCall } from '../../testing/src';

import initialiseDataParsers, { __RewireAPI__ as DataParsersAPI } from '../src/middleware/dataParsers';

the('dataParsers middleware initialiser', () => {

  const stubJsonParser = {};
  const stubUrlencodedParser = {};
  const stubCookieParser = {};
  const stubApp = getStubApp();
  const stubBodyParser = createStubObject(['json', 'urlencoded']);
  const stubAppUse = sinon.spy(stubApp, 'use');

  sinon.stub(stubBodyParser, 'json').returns(stubJsonParser);
  sinon.stub(stubBodyParser, 'urlencoded').returns(stubUrlencodedParser);

  before(() => {

    DataParsersAPI.__Rewire__('bodyParser', stubBodyParser);
    DataParsersAPI.__Rewire__('cookieParser', () => stubCookieParser);
  });

  after(() => {

    DataParsersAPI.__ResetDependency__('bodyParser');
    DataParsersAPI.__ResetDependency__('cookieParser');
  });


  when('invoked with valid app instance', () => {

    before(() => {

      initialiseDataParsers(stubApp);
    });

    should('initialise body-parser json middleware', () => {

      assertCall(stubAppUse, 0, stubJsonParser);
    });

    should('initialise body-parser urlencoded middleware', () => {

      assertCall(stubAppUse, 1, stubUrlencodedParser);
    });

    should('initialise cookie-parser middleware', () => {

      assertCall(stubAppUse, 2, stubCookieParser);
    });
  });
});