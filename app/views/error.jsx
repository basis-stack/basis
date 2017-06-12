import React from 'react';

import MaterialContainer from './materialContainer';

export default props => (

  <MaterialContainer>
    <div className="basis-error-container">
      <h1 className="mdc-typography--display1">{ props.status }. <small>{ props.statusText }</small></h1>
      <h2 className="mdc-typography--body1">{ props.message }</h2>
      <pre>{ props.error.stack }</pre>
    </div>
  </MaterialContainer>
);