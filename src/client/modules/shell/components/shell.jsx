import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
import { core } from 'basis-client/modules';
import Typography from 'material-ui/Typography';

import { AppBar, Section } from './../../../components';

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

      <div>
        <AppBar onMenuClick={() => { console.log('Menu click'); }} />
        <Section>
          <Typography variant="display3" gutterBottom>
            Welcome To Basis
          </Typography>
          <Typography variant="subheading" gutterBottom>
            This is an App template based on the Basis Stack.
          </Typography>
        </Section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({

  onConfigReady: (config) => { dispatch(core.actions.initialise(config)); }
});

const mapStateToProps = state => ({

  config: state.core.config
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);