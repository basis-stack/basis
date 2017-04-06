import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../testing/specAliases';
import { assertWasCalled, assertParameter, assertCalledBefore } from './../testing/specAssertions';
import { default as createServer, __RewireAPI__ as CreateServerAPI } from './../bin/server';

the('server', () => {

  const stubServer = { listen: () => {}, on: () => {} }
  const stubHttp = { createServer: () => {} };
  const stubHandleError = sinon.spy();
  const stubAppInstance = {};
  const stubCreateApp = sinon.stub().returns(stubAppInstance);
  const stubHttpCreateServer = sinon.stub(stubHttp, 'createServer').returns(stubServer);
  const stubConfig = { webServerPort: 'SomePort' };
  const stubLogger = { info: () => {} };
  const stubContainer = {
    resolve: (key) => {
      // TODO: Can this switching be done using sinon alone ? withArgs or similar ?
      if (key === 'config') { return stubConfig; }
      if (key === 'logger') { return stubLogger; }
    },
    keys: { config: 'config', logger: 'logger' }
  };
  const stubServerListen = sinon.spy(stubServer, 'listen');
  const stubLoggerInfo = sinon.spy(stubLogger, 'info');
  const stubServerOn = sinon.spy(stubServer, 'on');
  const stubProcessExit = sinon.spy();

  let result;

  before(() => {

    CreateServerAPI.__Rewire__('http', stubHttp);
    CreateServerAPI.__Rewire__('handleError', stubHandleError);
    CreateServerAPI.__Rewire__('createApp', stubCreateApp);

    result = createServer(stubContainer, stubProcessExit);
  });

  after(() => {

    CreateServerAPI.__ResetDependency__('http');
    CreateServerAPI.__ResetDependency__('handleError');
    CreateServerAPI.__ResetDependency__('createApp');
  });

  when('created', () => {

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

    should('log an info message indicating server start and port number', () => {

      const expectedMessage = '[SERVER ] STARTED: listening on port SomePort';
      assertParameter(stubLoggerInfo, 0, expectedMessage);
    });
  });

  when('error occurs', () => {

    const stubError = new Error('Stub Error');
    
    before(() => {

      const onError = stubServerOn.args[0][1];

      onError(stubError);
    });
    
    should('relay the error to handleError', () => {

      assertWasCalled(stubHandleError);
      assertParameter(stubHandleError, 0, stubError);
    });

    should('stop the process with exit code 1', () => {

      const callback = stubHandleError.args[0][3];
      callback();

      assertWasCalled(stubProcessExit);
      assertParameter(stubProcessExit, 0, 1);
    });
  });
});