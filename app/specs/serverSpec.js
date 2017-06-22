import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { assertWasCalled, assertParameter, assertCalledBefore } from './utils/specAssertions';
import { getStubContainer } from './utils/fakes';
import createServer, { __RewireAPI__ as CreateServerAPI } from './../bin/server';
import constants from './../core/constants';

the('server', () => {

  const stubServer = { listen: () => {}, on: () => {} };
  const stubHttp = { createServer: () => {} };
  const stubOnErrorHandler = sinon.spy();
  const stubOnListeningHandler = sinon.spy();
  const stubAppInstance = {};
  const stubCreateApp = sinon.stub().returns(stubAppInstance);
  const stubHttpCreateServer = sinon.stub(stubHttp, 'createServer').returns(stubServer);
  const stubConfig = { webServerPort: 'SomePort', env: 'SomeEnv' };
  const stubLogger = { info: () => {} };
  const stubContainer = getStubContainer(stubConfig, stubLogger);
  const stubServerListen = sinon.spy(stubServer, 'listen');
  const stubLoggerInfo = sinon.spy(stubLogger, 'info');
  const stubServerOn = sinon.spy(stubServer, 'on');
  const stubTerminate = sinon.spy();

  let result;

  before(() => {

    CreateServerAPI.__Rewire__('http', stubHttp);
    CreateServerAPI.__Rewire__('onError', stubOnErrorHandler);
    CreateServerAPI.__Rewire__('onListening', stubOnListeningHandler);
    CreateServerAPI.__Rewire__('createApp', stubCreateApp);
    CreateServerAPI.__Rewire__('terminate', stubTerminate);

    result = createServer(stubContainer);
  });

  after(() => {

    CreateServerAPI.__ResetDependency__('http');
    CreateServerAPI.__ResetDependency__('onError');
    CreateServerAPI.__ResetDependency__('onListening');
    CreateServerAPI.__ResetDependency__('createApp');
    CreateServerAPI.__ResetDependency__('terminate');
  });

  when('created', () => {

    should('log an info message indicating runtime environment', () => {

      const expectedMessage = `${constants.text.logging.startupPrefix} INIT: bootstrapped config for env: SOMEENV`;

      assertWasCalled(stubLoggerInfo, expectedMessage);
    });

    should('pass the container to createApp()', () => {

      assertParameter(stubCreateApp, 0, stubContainer);
      assertCalledBefore(stubCreateApp, stubHttpCreateServer, 'createApp()', 'createServer()');
    });

    should('create the http server using the app', () => {

      assertParameter(stubHttpCreateServer, 0, stubAppInstance);
    });

    should('listen on the configured port', () => {

      assertWasCalled(stubServerListen);
      assertParameter(stubServerListen, 0, stubConfig.webServerPort);
    });

    should('return the server instance', () => {

      expect(result).to.equal(stubServer);
    });
  });

  when('listening', () => {

    before(() => {

      const onlistening = stubServerOn.args[1][1];

      onlistening();
    });

    should('relay the listening event to onListening', () => {

      assertWasCalled(stubOnListeningHandler);
    });
  });

  when('error occurs', () => {

    const stubError = new Error('Stub Error');

    before(() => {

      const onError = stubServerOn.args[0][1];

      onError(stubError);
    });

    should('relay the error to onError', () => {

      assertWasCalled(stubOnErrorHandler);
      assertParameter(stubOnErrorHandler, 2, stubError);
    });

    should('stop the process with exit code 1', () => {

      const callback = stubOnErrorHandler.args[0][3];
      callback();

      assertWasCalled(stubTerminate);
      assertParameter(stubTerminate, 0, 1);
    });
  });
});