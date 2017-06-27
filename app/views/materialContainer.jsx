import React from 'react';

export default WrappedComponent => (

  props => (

    <div className="mdc-typography">
      <WrappedComponent {...props} />
    </div>
  )
);