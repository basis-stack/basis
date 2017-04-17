import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should } from './utils/specAliases';

import { getRequestLogger, __RewireAPI__ as LoggingAPI } from './../middleware/logging';

the('logging middleware initialiser', () => {

  let stubMorgan;
  const stubMorganResult = { dummyMorgan: true };
  const stubLogStream = {};

  before(() => {

    stubMorgan = sinon.stub();
    stubMorgan.returns(stubMorganResult);
    LoggingAPI.__Rewire__('morgan', stubMorgan);
  });

  after(() => {

    LoggingAPI.__ResetDependency__('morgan');
  });

  const assertResult = (result, expectedResult) => {

    expect(result).to.not.be.undefined;
    expect(result).to.equal(expectedResult);
  };

  const assertFormat = (expectedFormat) => {

    expect(stubMorgan.args[0][0]).to.be.equal(expectedFormat);
  }

  const assertStream = () => {

    expect(stubMorgan.args[0][1].stream).to.be.equal(stubLogStream);
  }

  const invoke = (config) => {

    return getRequestLogger(config, stubLogStream);
  }

  when('getRequestLogger called', () => {

    withScenario('non-production env config', () => {

      const stubConfig = { env: 'development' };
      let result;

      before(() => {
        result = invoke(stubConfig);
      });

      after(() => {

        stubMorgan.resetHistory();
      });

      should('return a valid morgan instance', () => {

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

      const stubConfig = { env: 'production' };
      let result;

      before(() => {
        result = invoke(stubConfig);
      });

      after(() => {

        stubMorgan.resetHistory();
      });

      should('return a valid morgan instance', () => {

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