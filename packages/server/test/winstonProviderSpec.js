import { expect } from 'chai';
import assignDeep from 'object-assign-deep';

import { the, when, withScenario, should } from '../../testing/src';

import getWinston from '../src/core/winstonProvider';

const assertInstance = result => {

  expect(result).to.not.be.undefined;
  expect(typeof result.info).to.equal('function');
};

the('winstonProvider', () => {

  const config = { shared: { appName: 'testapp' } };

  when('instance requested', () => {

    withScenario('local env config', () => {

      const result = getWinston(assignDeep(config, { shared: { env: 'local' } }));

      should('return a valid winston instance', () => {

        assertInstance(result);
      });

      should('initialise console transport', () => {

        expect(result.transports.console).to.not.be.undefined;
        expect(result.transports.file).to.be.undefined;
      });
    });

    withScenario('non-local env config', () => {

      const result = getWinston(assignDeep(config, { shared: { env: 'some_other_env' } }));

      should('return a valid winston instance', () => {

        assertInstance(result);
      });

      should('initialise file transport', () => {

        expect(result.transports.console).to.be.undefined;
        expect(result.transports.file).to.not.be.undefined;
      });

      should('include app name & env in logfile name', () => {

        expect(result.transports.file.filename.length).to.be.above(0);
        expect(result.transports.file.filename.includes('testapp')).to.equal(true);
        expect(result.transports.file.filename.includes('some_other_env')).to.equal(true);
      });
    });
  });
});