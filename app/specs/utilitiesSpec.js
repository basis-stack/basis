import { expect } from 'chai';
import * as sinon from 'sinon';

import { the, should, when } from './utils/specAliases';
import { terminate, dynamicImport } from './../core/utilities';

the('utilities module', () => {

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

  when('dynamicImport invoked', () => {

    let result;

    before(() => {

      result = dynamicImport('specs/utils/stubModule');
    });

    should('import and return the specified module', () => {

      expect(result.default.isStubModule).to.equal(true);
    });
  });
});