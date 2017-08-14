import { expect } from 'chai';
// import { shallow } from 'enzyme';

import { the, when, should, withScenario } from './../utils/specAliases';
import Icon from './../../src/server/components/icon';

the('<Icon /> component', () => {

  when('rendered', () => {

    should('render an <i> tag with data-icon attribute (showing icon name)', () => {

      // expect(false).to.equal(true);
    });

    withScenario('Material Design icon value', () => {

      should('specify is material design icon', () => {

        // expect(false).to.equal(true);
      });
    });

    withScenario('Font Awesome icon value', () => {

      should('specify is font awesome icon', () => {

        // expect(false).to.equal(true);
      });
    });

    withScenario('no prop overrides', () => {

      should('default icon size to 24 (md-24)', () => {

        // expect(false).to.equal(true);
      });

      should('default to active', () => {

        // expect(false).to.equal(true);
      });

      should('default to standard dark icon (md-dark)', () => {

        // expect(false).to.equal(true);
      });
    });

    withScenario('specific size', () => {

      should('set font size (md-<size>)', () => {

        // expect(false).to.equal(true);
      });
    });

    withScenario('inverse = true', () => {

      should('set to light icon (md-light)', () => {

        // expect(false).to.equal(true);
      });
    });

    withScenario('active = false', () => {

      should('set to inactive icon (md-inactive)', () => {

        // expect(false).to.equal(true);
      });
    });
  });
});