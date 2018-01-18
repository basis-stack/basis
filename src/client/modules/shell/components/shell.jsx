import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { core } from 'basis-client/modules';
// import { core } from './../../../../../packages/client/modules';

import Home from './home';
import About from './about';
import { FullHeight, AppBar, MuiButton } from './../../../components';

class Shell extends React.Component {

  componentDidMount() {

    if (this.props.config === undefined) {

      request.get('/config')
             .end((err, res) => {

               if (err !== null) {

                 // TODO: What to do here ?? Probably dispatch an app error action (to trigger a popup error message)
                 console.error(`Unable to request client config. Error: ${err.message}`);
               } else {

                 this.props.onConfigReady(res.body);
               }
             });
    }
  }

  _getTheme() {

    return {
      primary: '#f00',
      secondary: '#0f0'
    };
  }

  render() {

    return (

      <FullHeight>
        <AppBar />
        <MuiButton color="accent" onClick={() => this.props.onChangeTheme(this._getTheme())}>
          Change
        </MuiButton>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </FullHeight>
    );
  }
}

const mapDispatchToProps = dispatch => ({

  onChangeTheme: (theme) => { dispatch(core.actions.changeTheme(theme)); },
  onConfigReady: (config) => { dispatch(core.actions.initialise(config)); }
});

const mapStateToProps = state => ({

  config: state.core.config
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);