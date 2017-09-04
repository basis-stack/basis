import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when,
         getStubResponse, getStubContainer,
         assertParameter } from 'basis-testing';

import HomeController from './../../src/server/routes/home/homeController';

the('HomeController', () => {

  const stubConfig = {
    shared: { env: 'SomeEnv' },
    client: { someProb: 'Some Value' }
  };
  const stubContainer = getStubContainer(stubConfig, undefined);

  const controller = new HomeController(stubContainer);

  should('define a GET handler for the root (\'/\') path', () => {

    const methodName = 'root';
    const path = Reflect.getMetadata('http:path', controller, methodName);
    const method = Reflect.getMetadata('http:method', controller, methodName);

    expect(path).to.equal('');
    expect(method).to.equal('get');
  });

  should('define a GET handler for the \'/config\' path', () => {

    const methodName = 'getClientConfig';
    const path = Reflect.getMetadata('http:path', controller, methodName);
    const method = Reflect.getMetadata('http:method', controller, methodName);

    expect(path).to.equal('config');
    expect(method).to.equal('get');
  });

  when('route path hit', () => {

    const stubResponse = getStubResponse();
    const stubResponseRender = sinon.spy(stubResponse, 'render');

    controller.root(undefined, stubResponse, undefined);

    should('render the app (SPA) view', () => {

      assertParameter(stubResponseRender, 0, 'app');
      assertParameter(stubResponseRender, 1, { title: 'Basis' }, true);
    });
  });

  when('config path hit', () => {

    const stubResponse = getStubResponse();
    const stubResponseSend = sinon.spy(stubResponse, 'send');

    controller.getClientConfig(undefined, stubResponse, undefined);

    should('send combined client config json', () => {

      const expectedJson = { env: 'SomeEnv', someProb: 'Some Value' };

      assertParameter(stubResponseSend, 0, expectedJson, true);
    });
  });
});