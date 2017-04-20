import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { assertWasCalled, assertParameter } from './utils/specAssertions';
import { getStubRouter, getStubResponse } from './utils/fakes';

import { HomeController } from './../routes/home/homeController';

the('HomeController', () => {

  const stubRouter = getStubRouter();
  const stubRouterGet = sinon.spy(stubRouter, 'get');

  const controller = HomeController.initialise(stubRouter);

  when('initialised', () => {

    should('return a new controller instance', () => {

      expect(controller).to.not.be.undefined;
      expect(controller instanceof HomeController).to.equal(true);
    });

    should('hook up a GET handler for the root (\'/\') path', () => {

      assertParameter(stubRouterGet, 0, '/');
      assertParameter(stubRouterGet, 1, controller._handleRoot);
    });
  });

  when('route path hit', () => {

    const stubResponse = getStubResponse();
    const stubResponseSend = sinon.spy(stubResponse, 'send');

    controller._handleRoot(undefined, stubResponse, undefined);

    should('send Hello World', () => {

      assertWasCalled(stubResponseSend, 'Hello World!');
    });
  });
});