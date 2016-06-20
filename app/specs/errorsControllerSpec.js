import { expect } from 'chai';
import * as sinon from 'sinon';

import { ErrorsController } from './../controllers/errorsController';

describe('errorsController', () => {

   describe('should', () => {

      it('handle 404 errors', () => {

         const stubNextCallback = sinon.spy();

         ErrorsController.handle404({}, {}, stubNextCallback);
         const result = stubNextCallback.args[0][0];

         expect(stubNextCallback.calledOnce).to.equal(true);
         expect(result.status).to.equal(404);
         expect(result.message).to.equal('Not Found');
      });

      it('handle errors with a HTTP status code', () => {

         const stubResponse = { status: () => {}, send: () => {} };
         const statusSpy = sinon.spy(stubResponse, 'status');
         const sendSpy = sinon.spy(stubResponse, 'send');
         const stubError = { status: 403, message: 'Some HTTP Error'};

         ErrorsController.handleServerError(stubError, {}, stubResponse, {});

         expect(statusSpy.calledWithExactly(403)).to.equal(true);
         expect(sendSpy.calledWithExactly('Some HTTP Error')).to.equal(true);
      });

      it('handle generic errors as HTTP 500', () => {

         const stubResponse = { status: () => {}, send: () => {} };
         const statusSpy = sinon.spy(stubResponse, 'status');
         const sendSpy = sinon.spy(stubResponse, 'send');
         const stubError = { message: 'Some General Error' };

         ErrorsController.handleServerError(stubError, {}, stubResponse, {});

         expect(statusSpy.calledWithExactly(500)).to.equal(true);
         expect(sendSpy.calledWithExactly('Some General Error')).to.equal(true);
      });
   });
});