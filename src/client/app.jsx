import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RootRouter } from 'basis-client/components';

export default ({ routes }) => (

  <div>
    <CssBaseline />
    <RootRouter routes={routes} />
  </div>
);