import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when, withScenario } from './../../packages/testing';

import { terminate, dynamicImport, getEnvVariable } from './../../src/server/core/utilities';

the('utilities module', () => {

  when('terminate invoked', () => {

    let stubExit;

    before(() => {

      stubExit = sinon.stub(process, 'exit');
      terminate();
    });

    after(() => {

      stubExit.restore();
    });

    should('exit the running process with given exit code', () => {

      expect(stubExit.calledWithExactly(1)).to.equal(true);
    });
  });

  when('dynamicImport invoked', () => {

    let result;

    before(() => {

      result = dynamicImport('../../packages/testing').stubModule;
    });

    should('import and return the specified module', () => {

      expect(result.isStubModule).to.equal(true);
    });
  });

  when('getEnvVariable invoked', () => {

    const stubEnv = {
      SOME_VARIABLE: 'SomeVariableValue'
    };
    let stubEnvGet;

    before(() => {

      stubEnvGet = sinon.stub(process, 'env').get(() => stubEnv);
    });

    after(() => {

      stubEnvGet.restore();
    });

    withScenario('a valid env variable', () => {

      let result;

      before(() => {

        result = getEnvVariable('SOME_VARIABLE');
      });

      should('return the value for that variable', () => {

        expect(result).to.equal('SomeVariableValue');
      });
    });

    withScenario('an unknown env variable AND a specified default value', () => {

      let result;

      before(() => {

        result = getEnvVariable('SOME_OTHER_VARIABLE', 'SomeDefaultValue');
      });

      should('return the default value', () => {

        expect(result).to.equal('SomeDefaultValue');
      });
    });

    withScenario('an unknown env variable AND no default value', () => {

      let result;

      before(() => {

        result = getEnvVariable('SOME_OTHER_VARIABLE');
      });

      should('return undefined', () => {

        expect(result).to.be.undefined;
      });
    });
  });
});