import React from 'react';
import HTTPStatus from 'http-status';

import Icon from './../components/icon';
import material from './../components/materialContainer';

const ErrorView = (props) => {

  const iconName = props.status === HTTPStatus.NOT_FOUND ? 'sentiment_dissatisfied' : 'error_outline';

  return (
    <div className="basis-error-container">
      <div className="row middle-xs">
        <div className="col-xs-offset-3 col-xs-1">
          <Icon value={iconName} size="48" />
        </div>
        <div className="col-xs-8">
          <h1 className="mdc-typography--display1 mdc-theme--text-primary-on-background">{ props.status }. <small className="mdc-theme--text-secondary-on-background">{ props.statusText }</small></h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-offset-4 col-xs-8">
          <h2 className="mdc-typography--subheading1 mdc-theme--text-primary-on-background">{ props.message }</h2>
          <pre className="mdc-typography--body1 mdc-theme--text-hint-on-background">{ props.error.stack }</pre>
        </div>
      </div>
    </div>
  );
};

export default material(ErrorView);