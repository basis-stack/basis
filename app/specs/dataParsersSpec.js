import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, should, when } from './utils/specAliases';

import { createStubObject, getStubApp } from './utils/fakes';
import { assertCall } from './utils/specAssertions';
import initialiseDataParsers, { __RewireAPI__ as DataParsersAPI } from './../middleware/dataParsers';

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


  when('invoked with a valid app instance', () => {

    before(() => {

      initialiseDataParsers(stubApp);
    });

    should('initialise the body-parser json middleware', () => {

      assertCall(stubAppUse, 0, stubJsonParser);
    });

    should('initialise the body-parser urlencoded middleware', () => {

      assertCall(stubAppUse, 1, stubUrlencodedParser);
    });

    should('initialise the cookie-parser middleware', () => {

      assertCall(stubAppUse, 2, stubCookieParser);
    });
  });
});