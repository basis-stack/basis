import React from 'react';
import HTTPStatus from 'http-status';
import wordwrap from 'wordwrap';
import { Caption, Display1, Subheading1 } from 'react-mdc-web/lib';

import Icon from './../icon';
import material from './../materialContainer';

const ErrorView = (props) => {

  const wrap = wordwrap(100);
  const iconName = props.status === HTTPStatus.NOT_FOUND ? 'sentiment_dissatisfied' : 'error_outline';
  const stackTrace = props.error.stack !== undefined ? (
    <Caption component="pre" className="mdc-theme--text-secondary-on-background">
      { wrap(props.error.stack) }
    </Caption>) : null;

  return (
    <div className="basis-error-container">
      <div className="row middle-xs">
        <div className="col-lg-offset-2 col-lg-1">
          <Icon value={iconName} size="48" />
        </div>
        <div className="col-lg-6">
          <Display1 component="h1" className="mdc-theme--text-primary-on-background">
            { props.status }. <small className="mdc-theme--text-secondary-on-background">{ props.statusText }</small>
          </Display1>
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-lg-offset-3 col-lg-6">
          <Subheading1 component="h2" className="mdc-theme--text-primary-on-background">
            { props.message }
          </Subheading1>
          { stackTrace }
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  );
};

export default material(ErrorView);