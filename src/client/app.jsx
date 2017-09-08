import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header';
import Home from './home';
import About from './about';

const App = (props) => {

  const handleClick = () => {

    console.log('Toggled');
  };

  const welcomeMessage = 'Welcome to Basis';

  return (
    <main>
      <Header />
      <div>
        <h1>{welcomeMessage}</h1>
      </div>
      <Switch>
        <Route exact path="/" render={() => <Home onClick={handleClick} />} />
        <Route exact path="/about" component={About} />
      </Switch>
    </main>
  );
};

export default App;