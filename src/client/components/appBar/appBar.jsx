import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MuiAppBar, MuiToolbar, MuiTypography, MuiIconButton } from './../material-ui';

const styles = {

  root: {}
};

const AppBar = (props) => {

  const { classes } = props;

  return (

    <div className={classes.root}>
      <MuiAppBar position="static" color="primary">
        <MuiToolbar />
      </MuiAppBar>
    </div>
  );
};

AppBar.propTypes = {
  // classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);