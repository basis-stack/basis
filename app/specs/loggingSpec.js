import { expect } from 'chai';
import * as sinon from 'sinon';
import { forThe, given, when, then, and } from './../testing/specConstructs';

import { getRequestLogger, __RewireAPI__ as loggingAPI } from './../middleware/logging';

forThe('logging middleware initialiser', () => {

   let stubMorgan;
   const stubMorganResult = { dummyMorgan: true };
   const stubLogStream = {};

   before(() => {

      stubMorgan = sinon.stub();
      stubMorgan.returns(stubMorganResult);
      loggingAPI.__Rewire__('morgan', stubMorgan);
   });

   after(() => {

      loggingAPI.__ResetDependency__('morgan');
   });

   const assertResult = (result, expectedResult) => {

      expect(result).to.not.be.undefined;
      expect(result).to.equal(expectedResult);
   };

   const assertFormat = (expectedFormat) => {

      expect(stubMorgan.args[0][0]).to.be.equal(expectedFormat);
   }

   const assertStream = () => {

      expect(stubMorgan.args[0][1].stream).to.be.equal(stubLogStream);
   }

   const invoke = (config) => {

      stubMorgan.reset();
      return getRequestLogger(config, stubLogStream);
   }

   given('non-production env config', () => {

      const stubConfig = { env: 'development' };

      when('getRequestLogger invoked', () => {

         let result;

         before(() => {
            result = invoke(stubConfig);
         });

         then('should return a valid morgan instance', () => {

            assertResult(result, stubMorganResult);
         });

         and('use morgan \'dev\' format', () => {

            assertFormat('dev');
         });

         and('set the output stream', () => {

            assertStream();
         });
      });
   });

   given('production env config', () => {

      const stubConfig = { env: 'production' };

      when('getRequestLogger invoked', () => {

         let result;

         before(() => {
            result = invoke(stubConfig);
         });

         then('should return a valid morgan instance', () => {

            assertResult(result, stubMorganResult);
         });

         and('use morgan \'combined\' format', () => {

            assertFormat('combined');
         });

         and('set the output stream', () => {

            assertStream();
         });
      });
   });
});