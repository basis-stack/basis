import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, should, when } from './../testing/specAliases';

import { getApp, __RewireAPI__ } from './../app';

the('app', () => {

  const stubExpressInstance = { stubExpress: true };
  const stubExpress = sinon.stub().returns(stubExpressInstance);
  const stubContainer = { initialise: () => {} };
  const stubAppBuilderClass = { create: () => {} };

  const stubAppBuilderInstance = {
    stubAppBuilder: true,
    useHandlebars: () => {},
    logRequests: () => {},
    useBodyParser: () => {},
    useCookieParser: () => {},
    useRoutes: () => {},
    handleErrors: () => {},
    trustProxy: () => {},
    result: {}
  };

  before(() => {

    __RewireAPI__.__Rewire__('express', stubExpress);
    __RewireAPI__.__Rewire__('container', stubContainer);
    __RewireAPI__.__Rewire__('AppBuilder', stubAppBuilderClass);
  });

  after(() => {

    __RewireAPI__.__ResetDependency__('express');
    __RewireAPI__.__ResetDependency__('container');
    __RewireAPI__.__ResetDependency__('AppBuilder');
  });

  when('requested', () => {

    let stubContainerInitialise;
    let stubAppBuilderCreate;
    let result;

    before(() => {

      stubContainerInitialise = sinon.spy(stubContainer, 'initialise');
      stubAppBuilderCreate = sinon.stub(stubAppBuilderClass, 'create').returns(stubAppBuilderInstance);

      sinon.stub(stubAppBuilderInstance, 'useHandlebars').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'logRequests').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'useBodyParser').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'useCookieParser').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'useRoutes').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'handleErrors').returns(stubAppBuilderInstance);
      sinon.stub(stubAppBuilderInstance, 'trustProxy').returns(stubAppBuilderInstance);
      //sinon.stub(stubAppBuilderInstance, 'result').returns(stubAppBuilderInstance);

      result = getApp();
    });

    after(() => {

      stubContainerInitialise.restore();
    });

    should('initialise the container', () => {

      expect(stubContainerInitialise.calledOnce).to.be.equal(true);
    });

    should('pass an express instance to the AppBuilder', () => {

      const result = stubAppBuilderCreate.args[0][0];

      expect(result).to.be.equal(stubExpressInstance);
    });
  });
});