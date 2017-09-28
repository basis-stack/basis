// import React from 'react';
// import chai, { expect } from 'chai';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import chaiEnzyme from 'chai-enzyme';

// import { the, when, should, withScenario } from './../../testing';

// import Icon from './../src/icon';

// Enzyme.configure({ adapter: new Adapter() });
// chai.use(chaiEnzyme());

// the('<Icon /> component', () => {

//   when('rendered', () => {

//     should('render an <i> tag with data-icon attribute (showing icon name)', () => {

//       const wrapper = shallow(<Icon value="some_icon" />);

//       expect(wrapper).to.have.tagName('i');
//       expect(wrapper).to.have.data('icon', 'some_icon');
//     });

//     withScenario('Material Design icon value', () => {

//       const wrapper = shallow(<Icon value="error_outline" />);

//       should('specify is material design icon', () => {

//         expect(wrapper).to.have.className('material-icons');
//         expect(wrapper).to.have.text('error_outline');
//       });
//     });

//     withScenario('Font Awesome icon value', () => {

//       const wrapper = shallow(<Icon value="fa-user" />);

//       should('specify is font awesome icon', () => {

//         expect(wrapper).to.have.className('fa');
//         expect(wrapper).to.have.className('fa-user');
//         expect(wrapper).to.not.have.text('fa-user');
//       });
//     });

//     withScenario('no prop overrides', () => {

//       const wrapper = shallow(<Icon value="some_icon" />);

//       should('default icon size to 24 (md-24)', () => {

//         expect(wrapper).to.have.className('md-24');
//       });

//       should('default to active', () => {

//         expect(wrapper).to.not.have.className('md-inactive');
//       });

//       should('default to standard dark icon (md-dark)', () => {

//         expect(wrapper).to.have.className('md-dark');
//       });
//     });

//     withScenario('specific size', () => {

//       const wrapper = shallow(<Icon value="some_icon" size="48" />);

//       should('set font size (md-<size>)', () => {

//         expect(wrapper).to.have.className('md-48');
//       });
//     });

//     withScenario('inverse = true', () => {

//       const wrapper = shallow(<Icon value="some_icon" inverse />);

//       should('set to light icon (md-light)', () => {

//         expect(wrapper).to.have.className('md-light');
//       });
//     });

//     withScenario('active = false', () => {

//       const wrapper = shallow(<Icon value="some_icon" inactive />);

//       should('set to inactive icon (md-inactive)', () => {

//         expect(wrapper).to.have.className('md-inactive');
//       });
//     });
//   });
// });