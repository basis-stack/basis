import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

import { the, should, when,
         createStubObject, getStubResponse,
         assertWasCalled, assertParameter } from '../../testing/src';

the('renderers', () => {

  const stubElement = {};
  const stubReact = createStubObject('createElement');
  const stubMarkup = 'Some Markup';
  const stubRenderToStaticMarkup = sinon.stub().returns(stubMarkup);
  const stubResponse = getStubResponse();
  const stubResponseRender = sinon.spy(stubResponse, 'render');

  sinon.stub(stubReact, 'createElement').returns(stubElement);

  let renderView;

  before(() => {

    proxyquire.noCallThru();

    const mocks = {

      react: stubReact,
      'react-dom/server': { renderToStaticMarkup: stubRenderToStaticMarkup }
    };

    renderView = proxyquire('../src/core/renderers', mocks).default;

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