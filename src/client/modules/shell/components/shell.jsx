import React from 'react';
import { connect } from 'react-redux';
import MuiTypography from '@material-ui/core/Typography';
import MuiDrawer from '@material-ui/core/Drawer';

import { AppBar, Section } from '../../../components';
import { fetchConfig, toggleDrawer } from '../actions';
import SettingsPanel from './settingsPanel';

class Shell extends React.Component {

  componentDidMount() {

    const { config, onFetchConfig } = this.props;

    if (config === undefined) {

      onFetchConfig();
    }
  }

  render() {

    const { onToggleDrawer, layout } = this.props;

    return (

      <div>
        <AppBar onLeftIconClick={() => { console.log('Left icon click'); }}
                onSettingsClick={onToggleDrawer}
                onLogoutClick={() => { console.log('Logout'); }} />
        <MuiDrawer anchor="right"
                   open={layout.drawerOpen}
                   onClose={onToggleDrawer}>
          <SettingsPanel onCancel={onToggleDrawer}
                         onSave={(data) => { console.log(data); onToggleDrawer(); }} />
        </MuiDrawer>
        <Section>
          <MuiTypography variant="display3" gutterBottom>
            Welcome To Basis
          </MuiTypography>
          <MuiTypography variant="subheading" gutterBottom>
            This is an App template based on the Basis Stack.
          </MuiTypography>
        </Section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({

  onFetchConfig: () => { dispatch(fetchConfig()); },
  onToggleDrawer: () => { dispatch(toggleDrawer()); }
});

const mapStateToProps = state => ({

  config: state.core.config,
  layout: state.shell.layout
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);