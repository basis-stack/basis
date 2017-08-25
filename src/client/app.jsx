import React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default (props) => {

  const welcomeMessage = 'Welcome to Basis';

  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <Button label="OK" />
    </div>
  );
};