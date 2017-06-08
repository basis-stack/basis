import { expect } from 'chai';
import * as sinon from 'sinon';
import path from 'path';

import { the, when, withScenario, should } from './utils/specAliases';
import { getStubApp, getStubContainer } from './utils/fakes';
import { assertWasCalled, assertParameter, assertInstance } from './utils/specAssertions';
import AppBuilder, { __RewireAPI__ as AppBuilderAPI } from './../middleware/appBuilder';

the('appBuilder', () => {

  const stubConfig = {};
  const stubLogger = { logStream: {} };
  const stubContainer = getStubContainer(stubConfig, stubLogger);
  const stubApp = getStubApp();
  const stubInitialiseRoutes = sinon.spy();
  const stubInitialiseRequestLogger = sinon.spy();
  const stubInitialiseDataParsers = sinon.spy();
  const stubInitialiseErrorHandlers = sinon.spy();

  let builder;

  before(() => {

    AppBuilderAPI.__Rewire__('initialiseRoutes', stubInitialiseRoutes);
    AppBuilderAPI.__Rewire__('initialiseRequestLogger', stubInitialiseRequestLogger);
    AppBuilderAPI.__Rewire__('initialiseDataParsers', stubInitialiseDataParsers);
    AppBuilderAPI.__Rewire__('initialiseErrorHandlers', stubInitialiseErrorHandlers);

    builder = AppBuilder.create(stubContainer, stubApp);
  });

  after(() => {

    AppBuilderAPI.__ResetDependency__('initialiseRoutes');
    AppBuilderAPI.__ResetDependency__('initialiseRequestLogger');
    AppBuilderAPI.__ResetDependency__('initialiseDataParsers');
    AppBuilderAPI.__ResetDependency__('initialiseErrorHandlers');
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
      expect(firstSetCall.args[1]).to.equal(path.join(__dirname, '/../views'));
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

  when('useRoutes called', () => {

    let result;

    before(() => {

      result = builder.useRoutes();
    });

    should('initialise the app routes', () => {

      assertWasCalled(stubInitialiseRoutes);
      assertParameter(stubInitialiseRoutes, 0, stubApp);
      assertParameter(stubInitialiseRoutes, 1, stubContainer);
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

    let result;

    before(() => {

      result = builder.result;
    });

    should('return the app (express) instance', () => {

      expect(result).to.equal(stubApp);
    });
  });
});