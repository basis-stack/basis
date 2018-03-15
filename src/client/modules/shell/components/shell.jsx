import React from 'react';
import { connect } from 'react-redux';
import MuiTypography from 'material-ui/Typography';
import MuiDrawer from 'material-ui/Drawer';

import { AppBar, Section } from './../../../components';
import { fetchConfig, toggleDrawer } from './../actions';
import SettingsPanel from './settingsPanel';

class Shell extends React.Component {

  componentDidMount() {

    if (this.props.config === undefined) {

      this.props.onFetchConfig();
    }
  }

  render() {

    return (

      <div>
        <AppBar onLeftIconClick={() => { console.log('Left icon click'); }}
                onSettingsClick={this.props.onToggleDrawer}
                onLogoutClick={() => { console.log('Logout'); }} />
        <MuiDrawer anchor="right"
                   open={this.props.layout.drawerOpen}
                   onClose={this.props.onToggleDrawer}>
          <SettingsPanel onCancel={this.props.onToggleDrawer}
                         onSave={(data) => { console.log(data); this.props.onToggleDrawer(); }} />
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