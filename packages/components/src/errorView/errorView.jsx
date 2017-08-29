import React from 'react';
import HTTPStatus from 'http-status';
import wordwrap from 'wordwrap';

import Icon from './../icon';
import material from './../materialContainer';

const ErrorView = (props) => {

  const wrap = wordwrap(100);
  const iconName = props.status === HTTPStatus.NOT_FOUND ? 'sentiment_dissatisfied' : 'error_outline';
  const stackTrace = props.error.stack !== undefined ? <pre className="mdc-typography--body1 mdc-theme--text-hint-on-background">{ wrap(props.error.stack) }</pre> : null;

  return (
    <div className="basis-error-container">
      <div className="row middle-xs">
        <div className="col-lg-offset-2 col-lg-1">
          <Icon value={iconName} size="48" />
        </div>
        <div className="col-lg-6">
          <h1 className="mdc-typography--display1 mdc-theme--text-primary-on-background">{ props.status }. <small className="mdc-theme--text-secondary-on-background">{ props.statusText }</small></h1>
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-lg-offset-3 col-lg-6">
          <h2 className="mdc-typography--subheading1 mdc-theme--text-primary-on-background">{ props.message }</h2>
          { stackTrace }
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  );
};

export default material(ErrorView);