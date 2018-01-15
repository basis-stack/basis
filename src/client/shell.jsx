import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import { initialise } from './modules/core/actions';
import Home from './home';
import About from './about';

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

  render() {

    return (

      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({

  onConfigReady: (config) => { dispatch(initialise(config)); }
});

const mapStateToProps = state => ({

  config: state.core.config
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);