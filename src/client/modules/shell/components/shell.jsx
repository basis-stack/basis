import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
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
                         onSave={data => { console.log(data); onToggleDrawer(); }} />
        </MuiDrawer>
        <Section>
          <Typography variant="h1" component="h2" gutterBottom>
            h1. Heading
          </Typography>
          <Typography variant="h2" gutterBottom>
            h2. Heading
          </Typography>
          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="h5" gutterBottom>
            h5. Heading
          </Typography>
          <Typography variant="h6" gutterBottom>
            h6. Heading
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            button text
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            caption text
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            overline text
          </Typography>
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
