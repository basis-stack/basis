import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'basis-components';
import { withStyles } from 'material-ui/styles';
import MuiAppBar from 'material-ui/AppBar';
import MuiToolbar from 'material-ui/Toolbar';
import MuiTypography from 'material-ui/Typography';
import MuiIconButton from 'material-ui/IconButton';

const styles = {

  title: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 3
  }
};

const AppBar = (props) => {

  const { classes, onMenuClick } = props;

  return (
    <div>
      <MuiAppBar position="static" elevation={2}>
        <MuiToolbar>
          <MuiIconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onMenuClick}>
            <Icon value="menu" inverse />
          </MuiIconButton>
          <MuiTypography variant="title" color="inherit" className={classes.title}>
            Basis
          </MuiTypography>
        </MuiToolbar>
      </MuiAppBar>
    </div>
  );
};

AppBar.propTypes = {
  // classes: PropTypes.object.isRequired,
  onMenuClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AppBar);