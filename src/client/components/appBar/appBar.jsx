import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'basis-components';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';

const styles = theme => ({

  title: {
    flex: 1
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 3
  }
});

const AppBar = ({ classes, onLeftIconClick, onSettingsClick, onLogoutClick }) => {

  const leftIconButtonProps = { className: classes.leftButton, color: 'inherit', onClick: onLeftIconClick };
  const leftIconProps = { value: 'menu', inverse: true };

  const leftIcon = (
    <MuiIconButton {...leftIconButtonProps}>
      <Icon {...leftIconProps} />
    </MuiIconButton>
  );

  return (
    <div>
      <MuiAppBar position="static" elevation={0}>
        <MuiToolbar>
          { leftIcon }
          <MuiTypography variant="title" color="inherit" className={classes.title}>
            Basis
          </MuiTypography>
          <MuiIconButton color="inherit" onClick={onSettingsClick}>
            <Icon value="settings" inverse />
          </MuiIconButton>
          <MuiIconButton color="inherit" onClick={onLogoutClick}>
            <Icon value="exit_to_app" inverse />
          </MuiIconButton>
        </MuiToolbar>
      </MuiAppBar>
    </div>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onLeftIconClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AppBar);