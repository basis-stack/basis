import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, should, when } from './../testing/specAliases';

import { Logger, __RewireAPI__ } from './../core/logger';

the('logger', () => {

  let inputConfig;
  const stubConfig = {};
  const stubWinston = { info: () => {}, error: () => {} };
  const stubWinstonProvider = {

    getInstance: (config) => {

      inputConfig = config;
      return stubWinston;
    }
  };

  let logger;

  before(() => {

    __RewireAPI__.__Rewire__('WinstonProvider', stubWinstonProvider);
    logger = new Logger(stubConfig);
  });

  after(() => {

    __RewireAPI__.__ResetDependency__('WinstonProvider');
  });

  when('instantiated', () => {

    should('initialise winston instance from input config', () => {

      expect(inputConfig).to.be.equal(stubConfig);
      expect(logger._winston).to.be.equal(stubWinston);
    });
  });

  when('logStream requested', () => {

    should('return a morgan compatible stream', () => {

      const result = logger.logStream;

      expect(result.write).to.not.be.undefined;
    });
  });

  when('logStream written to', () => {

    let winstonInfoSpy;
    let result;

    before(() => {

      winstonInfoSpy = sinon.spy(stubWinston, 'info');
      logger.logStream.write('Test message\n with second line');
      result = winstonInfoSpy.args[0][0];
    });

    after(() => {

      winstonInfoSpy.restore();
    });

    should('log a [REQUEST] info message to winston', () => {

      expect(result.includes('[REQUEST]')).to.be.equal(true);
    });

    should('strip out carridge returns', () => {

      expect(result.includes('\n')).to.be.equal(false);
    });
  });

  when('info called', () => {

    let winstonInfoSpy;
    let result;

    before(() => {

      winstonInfoSpy = sinon.spy(stubWinston, 'info');
      logger.info('Test info message');
      result = winstonInfoSpy.args[0][0];
    });

    after(() => {

      winstonInfoSpy.restore();
    });

    should('log info message to winston', () => {

      expect(result).to.be.equal('Test info message');
    });
  });

  when('error called', () => {

    let winstonErrorSpy;
    let result;

    before(() => {

      winstonErrorSpy = sinon.spy(stubWinston, 'error');
      logger.error('Test error message');
      result = winstonErrorSpy.args[0][0];
    });

    after(() => {

      winstonErrorSpy.restore();
    });

    should('log error message to winston', () => {

      expect(result).to.be.equal('Test error message');
    });
  });
});