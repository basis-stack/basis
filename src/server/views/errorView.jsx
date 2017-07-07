import React from 'react';

import material from './materialContainer';

const ErrorView = props => (

  <div className="basis-error-container">
    <h1 className="mdc-typography--display1 mdc-theme--text-primary-on-background">{ props.status }. <small className="mdc-theme--text-secondary-on-background">{ props.statusText }</small></h1>
    <h2 className="mdc-typography--body1 mdc-theme--text-primary-on-background">{ props.message }</h2>
    <pre>{ props.error.stack }</pre>
  </div>
);

export default material(ErrorView);