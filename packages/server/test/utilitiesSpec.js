import { expect } from 'chai';
import * as sinon from 'sinon';
import path from 'path';

import { the, should, when, withScenario,
         createStubObject } from './../../testing';

import { getRootPath, terminate, dynamicImport, getEnvVariable, __RewireAPI__ as UtilitiesAPI } from './../src/core/utilities';

the('utilities module', () => {

  when('getRootPath invoked', () => {

    const stubFs = createStubObject('readdirSync');
    let stubCwd;

    before(() => {

      UtilitiesAPI.__Rewire__('fs', stubFs);
      stubCwd = sinon.stub(process, 'cwd').returns('/some-runtime-path');
    });

    after(() => {

      UtilitiesAPI.__ResetDependency__('fs');
      stubCwd.restore();
    });

    withScenario('runtime working directory', () => {

      let stubReaddirSync;
      let result;

      before(() => {

        stubReaddirSync = sinon.stub(stubFs, 'readdirSync').returns([]);

        result = getRootPath();
      });

      after(() => {

        stubReaddirSync.restore();
      });

      should('return the runtime directory', () => {

        expect(result).to.equal('/some-runtime-path');
      });
    });

    withScenario('codebase working directory', () => {

      let stubReaddirSync;
      let result;

      before(() => {

        stubReaddirSync = sinon.stub(stubFs, 'readdirSync').returns(['dist']);

        result = getRootPath();
      });

      after(() => {

        stubReaddirSync.restore();
      });

      should('return the runtime directory', () => {

        expect(result).to.equal('/some-runtime-path/dist');
      });
    });
  });

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

    withScenario('no specified basePath', () => {

      let result;

      before(() => {

        result = dynamicImport('./packages/testing').stubModule;
      });

      should('import and return the specified module from root path', () => {

        expect(result.isStubModule).to.equal(true);
      });
    });

    withScenario('specific basePath', () => {

      let result;

      before(() => {

        result = dynamicImport('./components', path.join(process.cwd(), 'packages')).Icon;
      });

      should('import and return the specified module from the supplied relative path', () => {

        expect(result).to.not.be.undefined;
      });
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