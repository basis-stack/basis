import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({

  root: theme.mixins.gutters({

    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  })
});

const Section = (props) => {

  const { classes, children } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        { children }
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Section);