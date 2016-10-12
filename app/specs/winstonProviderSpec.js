import { expect } from 'chai';
import * as sinon from 'sinon';
import { forThe, given, when, then, and } from './../testing/specConstructs';

import { WinstonProvider } from './../services/winstonProvider';

const assertInstance = (result) => {

   expect(result).to.not.be.undefined;
   expect(typeof result.info).to.equal('function');
}

forThe('WinstonProvider', () => {

   const config = { appName: 'testapp' };

   given('local env config', () => {

      when('winston instance requested', () => {

         const result = WinstonProvider.getInstance(Object.assign(config, { env: 'local' }));

         then('an instance should be returned', () => {

            assertInstance(result);
         });

         and('console transport should be set', () => {

            expect(result.transports.console).to.not.be.undefined;
            expect(result.transports.file).to.be.undefined;
         });
      });
   });

   given('non-local env config', () => {

      when('winston instance requested', () => {

         const result = WinstonProvider.getInstance(Object.assign(config, { env: 'some_other_env' }));

         then('an instance should be returned', () => {

            assertInstance(result);
         });

         and('file transport should be set', () => {

            expect(result.transports.console).to.be.undefined;
            expect(result.transports.file).to.not.be.undefined;
         });

         and('logfile name should include both app name & env', () => {

            expect(result.transports.file.filename.length).to.be.above(0);
            expect(result.transports.file.filename.includes('testapp')).to.equal(true);
            expect(result.transports.file.filename.includes('some_other_env')).to.equal(true);
         });
      });
   });
});