import { expect } from 'chai';
import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, when, withScenario, should,
         getStubApp } from '../../testing/src';

the('logging middleware initialiser', () => {

  let stubMorgan;
  const stubMorganResult = { dummyMorgan: true };
  const stubLogStream = {};

  let initialiseRequestLogger;

  before(() => {

    stubMorgan = sinon.stub();
    stubMorgan.returns(stubMorganResult);

    proxyquire.noCallThru();

    const mocks = {

      morgan: stubMorgan
    };

    initialiseRequestLogger = proxyquire('../src/middleware/logging', mocks).default;
  });

  const assertResult = (result, expectedResult) => {

    expect(result).to.not.be.undefined;
    expect(result).to.equal(expectedResult);
  };

  const assertFormat = (expectedFormat) => {

    expect(stubMorgan.args[0][0]).to.be.equal(expectedFormat);
  };

  const assertStream = () => {

    expect(stubMorgan.args[0][1].stream).to.be.equal(stubLogStream);
  };

  const initialiseAndGetMorgan = (config) => {

    const stubApp = getStubApp();
    const stubAppUse = sinon.spy(stubApp, 'use');

    initialiseRequestLogger(stubApp, config, stubLogStream);

    return stubAppUse.args[0][0];
  };

  when('invoked with valid app instance', () => {

    withScenario('non-production env config', () => {

      const stubConfig = { shared: { env: 'development' } };
      let result;

      before(() => {
        result = initialiseAndGetMorgan(stubConfig);
      });

      after(() => {

        stubMorgan.resetHistory();
      });

      should('return valid morgan instance', () => {

        assertResult(result, stubMorganResult);
      });

      should('use morgan \'dev\' format', () => {

        assertFormat('dev');
      });

      should('set the output stream', () => {

        assertStream();
      });
    });

    withScenario('production env config', () => {

      const stubConfig = { shared: { env: 'production' } };
      let result;

      before(() => {

        result = initialiseAndGetMorgan(stubConfig);
      });

      after(() => {

        stubMorgan.resetHistory();
      });

      should('return valid morgan instance', () => {

        assertResult(result, stubMorganResult);
      });

      should('use morgan \'combined\' format', () => {

        assertFormat('combined');
      });

      should('set the output stream', () => {

        assertStream();
      });
    });
  });
});