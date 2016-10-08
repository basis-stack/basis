import { expect } from 'chai';
import * as sinon from 'sinon';
import { forThe, given, when, then, and } from './../testing/specConstructs';

import container from './../services/container';

forThe('Container', () => {

   //container.initialise();

   given('A key and an instance', () => {

      const stubKey = 'SomeKey';
      const stubInstance = {};

      when('register called', () => {

         container.register(stubKey, stubInstance);

         then('instance should be stored against that key', () => {

            const result = container.resolve(stubKey);
            expect(result).to.equal(stubInstance);
         });
      });
   });

   given('An unknown key', () => {

      const stubKey = 'SomeUnknownKey';

      when('resolve called with that unknown key', () => {

         let result;
         
         try {
            container.resolve(stubKey);
         }
         catch(error) {
            result = error;
         }

         then('an error should be thown indicating missing key', () => {

            const expectedErrorMessage = `[CONTAINER]: Unable to resolve instance. Key '${stubKey}' not found.`;
            expect(result.message).to.equal(expectedErrorMessage);
         });
      });
   });

   after(() => {

      //container.initialise();
   });
});