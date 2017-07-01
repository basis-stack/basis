import * as sinon from 'sinon';

import { the, should, when } from './../utils/specAliases';
import { createStubObject, getStubResponse } from './../utils/fakes';
import { assertWasCalled, assertParameter } from './../utils/specAssertions';
import renderView, { __RewireAPI__ as RenderersAPI } from './../../src/server/core/renderers';

the('renderers', () => {

  const stubElement = {};
  const stubReact = createStubObject('createElement');
  const stubMarkup = 'Some Markup';
  const stubRenderToStaticMarkup = sinon.stub().returns(stubMarkup);
  const stubResponse = getStubResponse();
  const stubResponseRender = sinon.spy(stubResponse, 'render');

  sinon.stub(stubReact, 'createElement').returns(stubElement);

  before(() => {

    RenderersAPI.__Rewire__('React', stubReact);
    RenderersAPI.__Rewire__('renderToStaticMarkup', stubRenderToStaticMarkup);
  });

  after(() => {

    RenderersAPI.__ResetDependency__('React');
    RenderersAPI.__ResetDependency__('renderToStaticMarkup');
  });

  when('renderView called with valid React component', () => {

    const stubComponent = {};
    const stubProps = {};

    before(() => {

      renderView(stubResponse, 'somePage', 'Some Page Title', stubComponent, stubProps);
    });

    should('render the React component to raw HTML markup', () => {

      assertWasCalled(stubRenderToStaticMarkup, stubElement);
    });

    should('render the specified view', () => {

      assertParameter(stubResponseRender, 0, 'somePage');
    });

    should('include page title and markup in view data', () => {

      const expectedValue = { title: 'Some Page Title', markup: stubMarkup };

      assertParameter(stubResponseRender, 1, expectedValue, true);
    });
  });
});