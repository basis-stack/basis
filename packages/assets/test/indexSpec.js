import { expect } from 'chai';

import { the, should } from '../../testing/src';

import assetConfig from '../src';

the('asset package', () => {

  const fonts = assetConfig.vendor.fonts;

  should('export vendor font paths', () => {

    expect(fonts).to.not.be.undefined;
  });

  should('include the Roboto font', () => {

    expect(fonts.filter(f => f.includes('roboto-fontface'))).to.not.be.undefined;
  });

  should('include the Material Design icons font', () => {

    expect(fonts.filter(f => f.includes('material-design-icons'))).to.not.be.undefined;
  });

  should('include the Font Awesome icons font', () => {

    expect(fonts.filter(f => f.includes('font-awesome'))).to.not.be.undefined;
  });

  should('include Material Design colours', () => {

    expect(assetConfig.colours).to.not.be.undefined;
  });
});