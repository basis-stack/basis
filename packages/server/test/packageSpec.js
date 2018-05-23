import { expect } from 'chai';

import { the, should } from './../../testing/src';
import { main } from './../src';
import { Get } from './../decorators';

the('server package', () => {

  should('export the main function', () => {

    expect(main).to.not.be.undefined;
  });

  should('export the decorators', () => {

    expect(Get).to.not.be.undefined;
  });
});