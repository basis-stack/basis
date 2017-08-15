import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../../packages/testing/aliases';
import { assertParameter, assertInstance } from './../../packages/testing/assertions';
import { getStubRouter, getStubResponse } from './../../packages/testing/fakes';

import HomeController from './../../src/server/routes/home/homeController';

the('HomeController', () => {

  const stubRouter = getStubRouter();
  const stubRouterGet = sinon.spy(stubRouter, 'get');

  const controller = HomeController.initialise(stubRouter);

  when('initialised', () => {

    should('return a new controller instance', () => {

      assertInstance(controller, HomeController);
    });

    should('hook up a GET handler for the root (\'/\') path', () => {

      assertParameter(stubRouterGet, 0, '/');
      assertParameter(stubRouterGet, 1, controller.root);
    });
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
});