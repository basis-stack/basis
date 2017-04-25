import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { assertWasCalled } from './utils/specAssertions';
import { createStubObject } from './utils/fakes';
import routesIndex, { __RewireAPI__ as RoutesIndexAPI } from './../routes';

the('routes index', () => {

  const stubFs = createStubObject('readdirSync');
  const stubRouter = {};
  const stubExpress = createStubObject('Router');
  sinon.stub(stubFs, 'readdirSync').returns([]);

  before(() => {

    RoutesIndexAPI.__Rewire__('express', stubExpress);
    RoutesIndexAPI.__Rewire__('fs', stubFs);
  });

  after(() => {

    RoutesIndexAPI.__ResetDependency__('express');
    RoutesIndexAPI.__ResetDependency__('fs');
  });

  when('requested', () => {

    let stubExpressRouter;
    let stubHomeControllerInitialise;
    let result;

    before(() => {

      stubExpressRouter = sinon.stub(stubExpress, 'Router').returns(stubRouter);

      result = routesIndex();
    });

    should('initialise the express router', () => {

      assertWasCalled(stubExpressRouter);
    });

    should('return the router instance', () => {

      expect(result).to.equal(stubRouter);
    });
  });
});