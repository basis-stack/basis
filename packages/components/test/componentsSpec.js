import { expect } from 'chai';

import { the, should } from './../../testing';

import * as components from './../';

the('components index', () => {

  should('export the Icon component', () => {

    expect(components.Icon).to.not.be.undefined;
  });

  should('export the ErrorView component', () => {

    expect(components.ErrorView).to.not.be.undefined;
  });

  should('export the material HOC', () => {

    expect(components.material).to.not.be.undefined;
  });

  should('export the React Toolbox components', () => {

    expect(components.RTButton).to.not.be.undefined;
  });
});