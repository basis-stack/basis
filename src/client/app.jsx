import React from 'react';
import Reboot from 'material-ui/Reboot';
import { RootRouter } from 'basis-client/components';

export default ({ routes }) => (

  <div>
    <Reboot />
    <RootRouter routes={routes} />
  </div>
);