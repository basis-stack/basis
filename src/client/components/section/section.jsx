import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = ({ spacing, mixins }) => ({

  root: mixins.gutters({

    margin: spacing(2),
    padding: spacing(2)
  })
});

const Section = props => {

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
