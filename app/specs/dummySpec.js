import { expect } from 'chai';
import * as sinon from 'sinon';

describe('DummySpec', () => {

   describe('should', () => {

      beforeEach(() => {

         sinon.spy(console, 'log');
      });

      afterEach(() => {

         console.log.restore();
      });

      it('make assertions using chai.js', () => {

         expect(true).to.equal(true);
      });

      it('spy on objects using sinon.js', () => {

         const testMessage = 'Test message';

         console.log(testMessage);

         expect(console.log.calledOnce).to.equal(true);
         expect(console.log.firstCall.calledWith(testMessage)).to.equal(true);
      });
   });
});