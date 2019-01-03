import { expect } from 'chai';
import * as sinon from 'sinon';
import path from 'path';
import proxyquire from 'proxyquire';

import { the, when, should,
         getStubApp, getStubContainer,
         assertWasCalled, assertParameter, assertInstance } from '../../testing/src';

the('appBuilder', () => {

  const stubConfig = {};
  const stubLogger = { logStream: {} };
  const stubContainer = getStubContainer(stubConfig, stubLogger);
  const stubApp = getStubApp();
  const stubPassport = {};
  const stubInitialiseContent = sinon.spy();
  const stubInitialiseDataParsers = sinon.spy();
  const stubInitialiseErrorHandlers = sinon.spy();
  const stubInitialiseRequestLogger = sinon.spy();
  const stubInitialiseRoutes = sinon.spy();
  const stubInitialiseSecurity = sinon.spy();
  const stubInitialiseAuthentication = sinon.stub().returns(stubPassport);
  const stubGetRootPath = sinon.stub().returns('somepath');

  let AppBuilder;
  let builder;

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      './content': stubInitialiseContent,
      './dataParsers': stubInitialiseDataParsers,
      './errorHandlers': stubInitialiseErrorHandlers,
      './logging': stubInitialiseRequestLogger,
      './routes': stubInitialiseRoutes,
      './security': stubInitialiseSecurity,
      './authentication': stubInitialiseAuthentication,
      '../core/utilities': { getRootPath: stubGetRootPath }
    };

    AppBuilder = proxyquire('../src/middleware/appBuilder', mocks).default;
    builder = AppBuilder.create(stubContainer, stubApp);
  });

  when('created', () => {

    should('return a new AppBuilder instance', () => {

      assertInstance(builder, AppBuilder);
    });

    should('store config and logger instances from the container', () => {

      expect(builder._config).to.equal(stubConfig);
      expect(builder._logger).to.equal(stubLogger);
    });
  });

  when('useEjs called', () => {

    let setMethodSpy;
    let result;

    before(() => {

      setMethodSpy = sinon.spy(stubApp, 'set');
      result = builder.useEjs();
    });

    should('set views path to app views directory', () => {

      const firstSetCall = setMethodSpy.getCall(0);

      expect(firstSetCall.args[0]).to.equal('views');
      expect(firstSetCall.args[1]).to.equal(path.join('somepath', 'views'));
    });

    should('set view engine to ejs', () => {

      const secondSetCall = setMethodSpy.getCall(1);

      expect(secondSetCall.args[0]).to.equal('view engine');
      expect(secondSetCall.args[1]).to.equal('ejs');
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('logRequests called', () => {

    let result;

    before(() => {

      result = builder.logRequests();
    });

    should('initialise the request logger', () => {

      assertWasCalled(stubInitialiseRequestLogger);
      assertParameter(stubInitialiseRequestLogger, 0, stubApp);
      assertParameter(stubInitialiseRequestLogger, 1, stubConfig);
      assertParameter(stubInitialiseRequestLogger, 2, stubLogger.logStream);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('useDataParsers called', () => {

    let result;

    before(() => {

      result = builder.useDataParsers();
    });

    should('initialise the data parsers', () => {

      assertWasCalled(stubInitialiseDataParsers, stubApp);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('defaultContent called', () => {

    let result;

    before(() => {

      result = builder.defaultContent();
    });

    should('initialise the default content options (serve static & compress)', () => {

      assertWasCalled(stubInitialiseContent, stubApp);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('secure called', () => {

    let result;

    before(() => {

      result = builder.secure();
    });

    should('initialise security measures (HTTP headers via helmet)', () => {

      assertWasCalled(stubInitialiseSecurity, stubApp);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('useAuthentication called', () => {

    let result;

    before(() => {

      result = builder.useAuthentication();
    });

    should('initialise the authentication middleware', () => {

      assertWasCalled(stubInitialiseAuthentication);
      assertParameter(stubInitialiseAuthentication, 0, stubApp);
      assertParameter(stubInitialiseAuthentication, 1, stubContainer);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('useRoutes called', () => {

    const stubRoutes = {};
    let result;

    before(() => {

      result = builder.useRoutes(stubRoutes);
    });

    should('initialise the app routes', () => {

      assertWasCalled(stubInitialiseRoutes);
      assertParameter(stubInitialiseRoutes, 0, stubApp);
      assertParameter(stubInitialiseRoutes, 1, stubContainer);
      assertParameter(stubInitialiseRoutes, 2, stubRoutes);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('handleErrors called', () => {

    let result;

    before(() => {

      result = builder.handleErrors();
    });

    should('initialise the error handlers', () => {

      assertWasCalled(stubInitialiseErrorHandlers);
      assertParameter(stubInitialiseErrorHandlers, 0, stubApp);
      assertParameter(stubInitialiseErrorHandlers, 1, stubConfig);
      assertParameter(stubInitialiseErrorHandlers, 2, stubLogger);
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('trustProxy called', () => {

    let enableMethodSpy;
    let result;

    before(() => {

      enableMethodSpy = sinon.spy(stubApp, 'enable');
      result = builder.trustProxy();
    });

    should('enable \'trust proxy\' setting', () => {

      assertWasCalled(enableMethodSpy, 'trust proxy');
    });

    should('return the builder instance', () => {

      expect(result).to.equal(builder);
    });
  });

  when('result requested', () => {

    let r;

    before(() => {

      r = builder.result;
    });

    should('return the app (express) instance', () => {

      expect(r).to.equal(stubApp);
    });
  });
});