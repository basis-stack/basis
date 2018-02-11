import React from 'react';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
import { core } from 'basis-client/modules';
import Typography from 'material-ui/Typography';

import { AppBar, Section } from './../../../components';
import { fetchConfig } from './../actions';

class Shell extends React.Component {

  componentDidMount() {

    if (this.props.config === undefined) {

      this.props.onFetchConfig();
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

  onFetchConfig: () => { dispatch(fetchConfig()); }
});

const mapStateToProps = state => ({

  config: state.core.config
});

export default connect(mapStateToProps, mapDispatchToProps)(Shell);