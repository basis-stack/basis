import React from 'react';

export default WrappedComponent => (

  // eslint-disable-next-line react/destructuring-assignment
  props => (

    <div className="mdc-typography">
      <WrappedComponent {...props} />
    </div>
  )
);