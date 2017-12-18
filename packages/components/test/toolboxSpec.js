import { expect } from 'chai';

import { the, should } from './../../testing';

import * as toolbox from './../src/toolbox';

const assertComponent = (componentName, displayName = componentName) => {

  const component = toolbox[`RT${componentName}`];

  expect(component).to.not.be.undefined;
  expect(component.displayName).to.equal(`Themed${displayName}`);
};

const getText = component => `export the React Toolbox ${component} component`;

the('toolbox index', () => {

  should(getText('AppBar'), () => {

    assertComponent('AppBar');
  });

  should(getText('Autocomplete'), () => {

    assertComponent('Autocomplete');
  });

  should(getText('Avatar'), () => {

    assertComponent('Avatar');
  });

  should(getText('Button'), () => {

    assertComponent('Button', 'Themed');
  });

  should(getText('IconButton'), () => {

    assertComponent('IconButton', 'Themed');
  });

  should(getText('Card'), () => {

    assertComponent('Card');
  });

  should(getText('CardTitle'), () => {

    assertComponent('CardTitle');
  });

  should(getText('CardMedia'), () => {

    assertComponent('CardMedia');
  });

  should(getText('CardText'), () => {

    assertComponent('CardText');
  });

  should(getText('CardActions'), () => {

    assertComponent('CardActions');
  });

  should(getText('Checkbox'), () => {

    assertComponent('Checkbox');
  });

  should(getText('Chip'), () => {

    assertComponent('Chip');
  });

  should(getText('DatePicker'), () => {

    assertComponent('DatePicker');
  });

  should(getText('Dialog'), () => {

    assertComponent('Dialog', 'ActivableRenderer');
  });

  should(getText('Drawer'), () => {

    assertComponent('Drawer', 'ActivableRenderer');
  });

  should(getText('Dropdown'), () => {

    assertComponent('Dropdown');
  });

  should(getText('FontIcon'), () => {

    expect(toolbox.RTFontIcon).to.not.be.undefined;
  });

  should(getText('Input'), () => {

    assertComponent('Input');
  });

  should(getText('Layout'), () => {

    assertComponent('Layout');
  });

  should(getText('Panel'), () => {

    assertComponent('Panel');
  });

  should(getText('NavDrawer'), () => {

    assertComponent('NavDrawer');
  });

  should(getText('Sidebar'), () => {

    assertComponent('Sidebar');
  });

  should(getText('Link'), () => {

    assertComponent('Link');
  });

  should(getText('List'), () => {

    assertComponent('List');
  });

  should(getText('ListCheckbox'), () => {

    assertComponent('ListCheckbox');
  });

  should(getText('ListItem'), () => {

    assertComponent('ListItem', 'Themed');
  });

  should(getText('ListDivider'), () => {

    assertComponent('ListDivider');
  });

  should(getText('ListSubHeader'), () => {

    assertComponent('ListSubHeader');
  });

  should(getText('Menu'), () => {

    assertComponent('Menu');
  });

  should(getText('MenuDivider'), () => {

    assertComponent('MenuDivider');
  });

  should(getText('MenuItem'), () => {

    assertComponent('MenuItem', 'Themed');
  });

  should(getText('IconMenu'), () => {

    assertComponent('IconMenu');
  });

  should(getText('Navigation'), () => {

    assertComponent('Navigation');
  });

  should(getText('ProgressBar'), () => {

    assertComponent('ProgressBar');
  });

  should(getText('RadioGroup'), () => {

    assertComponent('RadioGroup');
  });

  should(getText('RadioButton'), () => {

    assertComponent('RadioButton');
  });

  should(getText('Ripple'), () => {

    expect(toolbox.RTRipple).to.not.be.undefined;
  });

  should(getText('Slider'), () => {

    assertComponent('Slider');
  });

  should(getText('Snackbar'), () => {

    assertComponent('Snackbar', 'ActivableRenderer');
  });

  should(getText('Switch'), () => {

    assertComponent('Switch');
  });

  should(getText('Table'), () => {

    assertComponent('Table');
  });

  should(getText('Tabs'), () => {

    assertComponent('Tabs');
  });

  should(getText('Tab'), () => {

    assertComponent('Tab', 'Themed');
  });

  should(getText('TimePicker'), () => {

    assertComponent('TimePicker');
  });

  should(getText('Tooltip'), () => {

    expect(toolbox.RTTooltip).to.not.be.undefined;
  });
});