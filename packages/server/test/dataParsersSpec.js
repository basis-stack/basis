import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when,
         createStubObject, getStubApp,
         assertCall } from '../../testing/src';

the('dataParsers middleware initialiser', () => {

  let initialiseDataParsers;
  const stubJsonParser = {};
  const stubUrlencodedParser = {};
  const stubCookieParser = {};
  const stubApp = getStubApp();
  const stubBodyParser = createStubObject(['json', 'urlencoded']);
  const stubAppUse = sinon.spy(stubApp, 'use');

  sinon.stub(stubBodyParser, 'json').returns(stubJsonParser);
  sinon.stub(stubBodyParser, 'urlencoded').returns(stubUrlencodedParser);

  before(() => {

    const mocks = {
      
      'body-parser': stubBodyParser,
      'cookie-parser': () => stubCookieParser 
    };
    
    initialiseDataParsers = proxyquire('../src/middleware/dataParsers', mocks).default;
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