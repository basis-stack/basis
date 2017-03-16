import { expect } from 'chai';
import * as sinon from 'sinon';
import { the, when, withScenario, should } from './../testing/specAliases';

import container from './../core/container';

the('Container', () => {

  //container.initialise();

  when('register called', () => {

    const stubKey = 'SomeKey';
    const stubInstance = {};

    container.register(stubKey, stubInstance);

    should('store instance against the given key', () => {

      const result = container.resolve(stubKey);
      expect(result).to.equal(stubInstance);
    });
  });

  when('resolve called', () => {

    withScenario('unknown key', () => {

      const stubKey = 'SomeUnknownKey';
      let result;

      try {
        container.resolve(stubKey);
      }
      catch(error) {
        result = error;
      }

      should('throw an error indicating missing key', () => {

        const expectedErrorMessage = `[CONTAINER]: Unable to resolve instance. Key '${stubKey}' not found.`;
        expect(result.message).to.equal(expectedErrorMessage);
      });
    });
  });

  // after(() => {

  //   //container.initialise();
  // });
});