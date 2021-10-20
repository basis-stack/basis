import { expect } from 'chai';
import assignDeep from 'object-assign-deep';
import Console from 'winston/lib/winston/transports/console';
import File from 'winston/lib/winston/transports/file';

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

        const transport = result.transports[0];

        expect(transport).to.not.be.undefined;
        expect(transport instanceof Console).to.be.true;
      });
    });

    withScenario('non-local env config', () => {

      const result = getWinston(assignDeep(config, { shared: { env: 'some_other_env' } }));
      const transport = result.transports[0];

      should('return a valid winston instance', () => {

        assertInstance(result);
      });

      should('initialise file transport', () => {

        expect(transport).to.not.be.undefined;
        expect(transport instanceof File).to.be.true;
      });

      should('include app name & env in logfile name', () => {

        expect(transport.filename.length).to.be.above(0);
        expect(transport.filename.includes('testapp')).to.equal(true);
        expect(transport.filename.includes('some_other_env')).to.equal(true);
      });
    });
  });
});
