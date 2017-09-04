import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when,
         getStubRouter, assertParameter } from './../../testing';

import { Controller, Get, Post } from './../src/core/decorators';
import bindRoutes from './../src/middleware/routeBinder';

@Controller('/base-path')
class StubController {

  constructor() {

    this._thingA = 'Thing A';
    this._thingB = 'Thing B';
  }

  @Get('get-something')
  getSomething() {

    return this._thingA;
  }

  @Post('/post-something')
  postSomething() {

    return this._thingB;
  }

  nonDecoratedMethod() {}

  _privateMethod() {}
}

the('routeBinder', () => {

  const stubRouter = getStubRouter();
  const stubRouterGet = sinon.spy(stubRouter, 'get');
  const stubRouterPost = sinon.spy(stubRouter, 'post');
  const controller = new StubController();

  when('invoked with a valid Controller, controller instance and express router', () => {

    bindRoutes(StubController, controller, stubRouter);

    should('bind methods (with decorators) to the express router for the defined route', () => {

      const getSomethingResult = stubRouterGet.args[0][1]();
      const postSomethingResult = stubRouterPost.args[0][1]();

      assertParameter(stubRouterGet, 0, '/base-path/get-something');
      assertParameter(stubRouterPost, 0, '/base-path/post-something');
      expect(getSomethingResult).to.equal('Thing A');
      expect(postSomethingResult).to.equal('Thing B');
    });

    should('prefox routes with the controller rootPath', () => {

      expect(stubRouterGet.args[0][0].includes('/base-path/')).to.equal(true);
      expect(stubRouterPost.args[0][0].includes('/base-path/')).to.equal(true);
    });

    should('flatten double slashes to single', () => {

      assertParameter(stubRouterPost, 0, '/base-path/post-something');
    });
  });
});