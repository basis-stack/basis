import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, when, withScenario, should } from './../../testing';

import getContainer, { __RewireAPI__ as ContainerAPI } from './../src/core/container';

the('container', () => {

  const stubConfig = {};
  const stubLogger = { warn: () => {} };
  const stubLoggerWarn = sinon.spy(stubLogger, 'warn');
  const stubConfigClass = { createFromSettingsFile: () => {} };
  const stubLoggerClass = { createFromConfig: () => {} };
  const stubInstance1 = { someInstance1: true };
  const stubInstance2 = { someInstance2: true };
  const stubDependencies = new Map().set('someKey1', stubInstance1)
                                    .set('someKey2', stubInstance2);
  const stubBootstrap = sinon.stub().returns(stubDependencies);
  const stubDynamicImport = sinon.stub().returns({ default: stubBootstrap });

  sinon.stub(stubConfigClass, 'createFromSettingsFile').returns(stubConfig);
  sinon.stub(stubLoggerClass, 'createFromConfig').returns(stubLogger);


  let container;

  before(() => {

    ContainerAPI.__Rewire__('Config', stubConfigClass);
    ContainerAPI.__Rewire__('Logger', stubLoggerClass);
    ContainerAPI.__Rewire__('dynamicImport', stubDynamicImport);

    container = getContainer();
  });

  after(() => {

    ContainerAPI.__ResetDependency__('Config');
    ContainerAPI.__ResetDependency__('Logger');
    ContainerAPI.__ResetDependency__('dynamicImport');
  });

  const reset = () => {

    container._instanceMap.clear();
  };

  when('instantiated', () => {

    should('initialise the instance map and component keys', () => {

      expect(container._instanceMap.size).to.equal(0);
      expect(container.instanceKeys).to.deep.equal({});
    });
  });

  when('initialised', () => {

    let result;

    before(() => {

      result = container.initialise();
    });

    after(() => {

      reset();
    });

    should('register a config instance', () => {

      expect(container.resolve('config')).to.equal(stubConfig);
    });

    should('register a logger instance', () => {

      expect(container.resolve('logger')).to.equal(stubLogger);
    });

    should('return the initialised container', () => {

      expect(result).to.equal(container);
    });

    withScenario('a valid bootstrap (dependencies) file', () => {

      should('register all custom dependencies', () => {

        expect(container.resolve('someKey1')).to.equal(stubInstance1);
        expect(container.resolve('someKey2')).to.equal(stubInstance2);
      });
    });

    withScenario('an invalid or missing bootstrap (dependencies) file', () => {

      before(() => {

        stubDynamicImport.reset();
        stubDynamicImport.throws(new Error('Some import error'));
        container.initialise();
      });

      should('log a warning message indicating error', () => {

        const arg = stubLoggerWarn.args[0][0];

        expect(arg).to.have.string('INVALID_BOOTSTRAP');
        expect(arg).to.have.string('Some import error');
      });
    });
  });

  when('register called', () => {

    const stubKey = 'SomeKey';
    const stubInstance = {};

    before(() => {

      container.register(stubKey, stubInstance);
    });

    after(() => {

      reset();
    });

    should('store instance against the given key', () => {

      const result = container.resolve(stubKey);
      expect(result).to.equal(stubInstance);
    });

    should('add the key to component keys enumeration', () => {

      expect(container.instanceKeys.SomeKey).to.equal(stubKey);
    });
  });

  when('resolve called', () => {

    withScenario('unknown key', () => {

      const stubKey = 'SomeUnknownKey';
      let result;

      before(() => {

        try {
          container.resolve(stubKey);
        } catch (error) {
          result = error;
        }
      });

      should('throw an error indicating missing key', () => {

        const expectedErrorMessage = `[CONTAINER]: unable to resolve instance. Key '${stubKey}' not found.`;
        expect(result.message).to.equal(expectedErrorMessage);
      });
    });

    withScenario('known key', () => {

      const stubKey = 'SomeKnownKey';
      const stubInstance = {};

      let result;

      before(() => {

        container.register(stubKey, stubInstance);

        result = container.resolve(stubKey);
      });

      after(() => {

        reset();
      });

      should('return the instance stored against that key', () => {

        expect(result).to.equal(stubInstance);
      });
    });
  });
});