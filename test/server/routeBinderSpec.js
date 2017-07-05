import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './../utils/specAliases';
import { assertParameter } from './../utils/specAssertions';
import { getStubRouter } from './../utils/fakes';
import { Controller, Get, Post } from './../../src/server/core/decorators';
import bindRoutes from './../../src/server/middleware/routeBinder';

@Controller('/base-path')
class StubController {

  @Get('get-something')
  getSomething() {}

  @Post('/post-something')
  postSomething() {}

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

    should('bind methods (with decorators) to the express router with the defined route', () => {

      assertParameter(stubRouterGet, 0, '/base-path/get-something');
      assertParameter(stubRouterGet, 1, controller.getSomething);
      assertParameter(stubRouterPost, 0, '/base-path/post-something');
      assertParameter(stubRouterPost, 1, controller.postSomething);
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