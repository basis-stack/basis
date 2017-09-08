import React from 'react';
import { Link } from 'react-router-dom';

export default props => (

  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  </header>
);