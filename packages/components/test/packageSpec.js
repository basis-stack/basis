import { expect } from 'chai';

import { the, should } from './../../testing/src';

import * as components from './../src';

the('components package', () => {

  should('export the Icon component', () => {

    expect(components.Icon).to.not.be.undefined;
  });

  should('export the ErrorView component', () => {

    expect(components.ErrorView).to.not.be.undefined;
  });

  should('export the material HOC', () => {

    expect(components.material).to.not.be.undefined;
  });
});