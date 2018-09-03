import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, should, withScenario } from '../../testing/src';

import Config, { __RewireAPI__ as ConfigAPI } from '../src/core/config';

the('Config class', () => {

  when('created (from settings file)', () => {

    const stubGetEnvVariable = sinon.stub();
    const stubJsonfile = { readFileSync: () => {} };
    const settingsFilePath = 'SomeFilePath';
    const stubSettingsJson = {
      default: {
        someDefaultSetting: 'someDefaultValue'
      },
      local: {
        foo: 'FooValue',
        bar: 'BarValue'
      },
      someEnv: {
        bla: 'BlaBlaValue'
      }
    };

    before(() => {

      sinon.stub(stubJsonfile, 'readFileSync').returns(stubSettingsJson);

      ConfigAPI.__Rewire__('getEnvVariable', stubGetEnvVariable);
      ConfigAPI.__Rewire__('jsonfile', stubJsonfile);
    });

    after(() => {

      ConfigAPI.__ResetDependency__('getEnvVariable');
      ConfigAPI.__ResetDependency__('jsonfile');
    });

    withScenario('no specified NODE_ENV', () => {

      let result;

      before(() => {

        stubGetEnvVariable.returns('local');

        result = Config.createFromSettingsFile(settingsFilePath);
      });

      after(() => {

        stubGetEnvVariable.reset();
      });

      should('include default settings', () => {

        expect(result.someDefaultSetting).to.equal('someDefaultValue');
      });

      should('include local env settings', () => {

        expect(result.foo).to.equal(stubSettingsJson.local.foo);
        expect(result.bar).to.equal(stubSettingsJson.local.bar);
      });

      should('include env name', () => {

        expect(result.shared.env).to.equal('local');
      });
    });

    withScenario('a known (configured) NODE_ENV', () => {

      let result;

      before(() => {

        stubGetEnvVariable.returns('someEnv');

        result = Config.createFromSettingsFile(settingsFilePath);
      });

      after(() => {

        stubGetEnvVariable.reset();
      });

      should('include default settings', () => {

        expect(result.someDefaultSetting).to.equal('someDefaultValue');
      });

      should('include the specific env settings', () => {

        expect(result.bla).to.equal(stubSettingsJson.someEnv.bla);
      });

      should('include env name', () => {

        expect(result.shared.env).to.equal('someEnv');
      });
    });

    withScenario('an unknown (non-configured) NODE_ENV', () => {

      let result;

      before(() => {

        stubGetEnvVariable.returns('someUnkownEnv');

        try {

          Config.createFromSettingsFile(settingsFilePath);
        } catch (e) {

          result = e.message;
        }
      });

      after(() => {

        stubGetEnvVariable.reset();
      });

      should('throw error indicating unknown environment', () => {

        expect(result).to.equal('Unable to bootstrap for environment: \'someUnkownEnv\'. No settings found in settings file for this environment.');
      });
    });
  });
});