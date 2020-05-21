import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiDivider from '@material-ui/core/Divider';

const styles = ({ spacing }) => {

  const padding = spacing(2);

  return {
    root: {
      width: 300,
      display: 'flex',
      flexDirection: 'column'
    },
    title: { padding },
    content: {
      padding,
      flexGrow: 2
    },
    buttons: {
      padding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      '& button': {
        marginLeft: spacing()
      }
    }
  };
};

const SettingsPanel = ({ classes, onCancel, onSave }) => (

  <div className={classes.root}>
    <MuiTypography variant="h6" component="h2" className={classes.title}>
      Settings
    </MuiTypography>
    <MuiDivider />
    <MuiTypography variant="body2" className={classes.content}>
      This is a sample slideout panel (Drawer) that shows how it can be controlled via Redux
    </MuiTypography>
    <div className={classes.buttons}>
      <MuiButton color="primary" onClick={onCancel}>
        CANCEL
      </MuiButton>
      <MuiButton variant="contained" color="primary" autoFocus onClick={() => onSave({ settingsData: {} })}>
        OK
      </MuiButton>
    </div>
  </div>
);

SettingsPanel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsPanel);
