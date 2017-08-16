import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { the, when, should } from './../../packages/testing/aliases';

import material from './../../src/server/components/materialContainer';

const StubComponent = props => <span>{ props.someProp }</span>;

chai.use(chaiEnzyme());

the('materialContainer HOC (higher-order component)', () => {

  when('invoked', () => {

    const HigherComponent = material(StubComponent);
    const wrapper = shallow(<HigherComponent someProp="someValue" />);

    should('wrap the input component in a <div> tag and use Material Design typography', () => {

      expect(wrapper.find('div')).to.have.className('mdc-typography');
    });

    should('render the input component and pass properties down to it', () => {

      expect(wrapper.find('StubComponent')).to.have.prop('someProp', 'someValue');
    });
  });
});