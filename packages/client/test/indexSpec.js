import { expect } from 'chai';
import proxyquire from 'proxyquire';

import { the, should } from '../../testing/src';

import { initialise, routeTypes } from '../src';

proxyquire.noCallThru();

the('client package', () => {

  should('export the (bootstrap) initialise funciton', () => {

    expect(initialise).to.not.be.undefined;
  });

  should('export all constants', () => {

    expect(routeTypes).to.not.be.undefined;
  });

  should('include an alias for \'modules\' at root level', () => {

    const stubDistModule = {};
    let modules;

    const mocks = { './dist/modules': stubDistModule };
    modules = proxyquire('../modules', mocks);

    expect(modules).to.equal(stubDistModule);
  });

  should('include an alias for \'components\' at root level', () => {

    const stubDistModule = {};
    let components;

    const mocks = { './dist/components': stubDistModule };
    components = proxyquire('../components', mocks);

    expect(components).to.equal(stubDistModule);
  });
});