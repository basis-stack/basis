import React from 'react';
import injectSheet from 'react-jss';

const styles = {

  fullHeight: {
    height: '100vh' // ,
    // background: 'red'
  }
};

const FullHeight = ({ classes, children }) => (

  <div className={classes.fullHeight}>
    { children }
  </div>
);

export default injectSheet(styles)(FullHeight);