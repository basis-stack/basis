import { expect } from 'chai';
import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import constants from '../src/core/constants';
import { the, should, when,
         createStubObject, getStubContainer, getStubLogger,
         assertCall } from '../../testing/src';

the('moduleLoader', () => {

  const stubFs = createStubObject('readdirSync');
  const stubLogger = getStubLogger();
  const stubLoggerWarn = sinon.stub(stubLogger, 'warn');
  const stubContainer = getStubContainer({}, stubLogger);
  const stubGetRootPath = sinon.stub().returns('');
  const stubModule1 = {
    default: {
      initRoutes: () => {}
    }
  };
  const stubModule2 = { default: {} };
  const stubDynamicImport = sinon.stub();

  let getModules;

  before(() => {

    stubDynamicImport.withArgs('./modules/moduleA').returns(stubModule1);
    stubDynamicImport.withArgs('./modules/moduleB').returns(stubModule2);
    stubDynamicImport.withArgs('./modules/moduleC').throws(new Error('Some Error'));

    sinon.stub(stubFs, 'readdirSync').returns(['moduleA', 'moduleB', 'moduleC']);

    const mocks = {

      fs: stubFs,
      './utilities': { dynamicImport: stubDynamicImport, getRootPath: stubGetRootPath }
    };

    getModules = proxyquire('../src/core/moduleLoader', mocks).default;
  });

  when('invoked with a valid container', () => {

    let result;

    before(() => {

      result = getModules(stubContainer);
    });

    should('load and return valid modules', () => {

      expect(result.length).to.equal(1);
      expect(result[0].key).to.equal('moduleA');
    });

    should('log a warning message if module contains no init methods', () => {

      const expectedResult = `${constants.text.logging.startupPrefix} INVALID_MODULE: unable to initialise module 'moduleB'. No init methods found.`;

      assertCall(stubLoggerWarn, 0, expectedResult);
    });

    should('log a warning message if module import errors', () => {

      const expectedResult = `${constants.text.logging.startupPrefix} INVALID_MODULE: unable to import module 'moduleC'. Error: Some Error`;

      assertCall(stubLoggerWarn, 1, expectedResult);
    });
  });
});