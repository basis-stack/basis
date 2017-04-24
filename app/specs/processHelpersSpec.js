import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import terminate from './../bin/processHelpers';

the('processHelpers', () => {

  when('terminate invoked', () => {

    let stubExit;

    before(() => {

      stubExit = sinon.stub(process, 'exit');
      terminate();
    });

    after(() => {

      stubExit.restore();
    });

    should('exit the running process with given exit code', () => {

      expect(stubExit.calledWithExactly(1)).to.equal(true);
    });
  });
});