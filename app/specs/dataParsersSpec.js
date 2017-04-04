import { expect } from 'chai';
import { the, should, when } from './../testing/specAliases';

import { getJsonParser, getUrlencodedParser, getCookieParser, __RewireAPI__ as dataParsersAPI } from './../middleware/dataParsers';

the('dataParsers middleware initialiser', () => {

  const stubJsonParser = {};
  const stubUrlencodedParser = {};
  const stubCookieParser = {};

  const stubBodyParser = {
    json: () => { return stubJsonParser },
    urlencoded: () => { return stubUrlencodedParser }
  };

  before(() => {

    dataParsersAPI.__Rewire__('bodyParser', stubBodyParser);
    dataParsersAPI.__Rewire__('cookieParser', () => { return stubCookieParser; });
  });

  after(() => {

    dataParsersAPI.__ResetDependency__('bodyParser');
    dataParsersAPI.__ResetDependency__('cookieParser');
  });


  when('getJsonParser invoked', () => {

    should('return the body-parser json middleware', () => {

      const result = getJsonParser();

      expect(result).to.equal(stubJsonParser);
    });
  });

  when('getUrlencodedParser invoked', () => {

    should('return the body-parser urlencoded middleware', () => {

      const result = getUrlencodedParser();

      expect(result).to.equal(stubUrlencodedParser);
    });
  });

  when('getCookieParser', () => {

    should('return the cookie-parser middleware', () => {

      const result = getCookieParser();

      expect(result).to.equal(stubCookieParser);
    });
  });
});