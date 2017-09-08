import React from 'react';
import { Button } from 'react-toolbox/lib/button';

const Home = ({ onClick }) => (

  <div>
    <Button label="OK" onClick={onClick} />
  </div>
);

export default Home;