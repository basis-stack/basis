import React from 'react';
import HTTPStatus from 'http-status';
import wordwrap from 'wordwrap';
import { Caption, Display1, Subheading1 } from 'react-mdc-web/lib';

import Icon from '../icon';
import material from '../materialContainer';

const ErrorView = ({ status, statusText, message, error }) => {

  const wrap = wordwrap(100);
  const iconName = status === HTTPStatus.NOT_FOUND ? 'sentiment_dissatisfied' : 'error_outline';
  const stackTrace = error.stack !== undefined ? (
    <Caption component="pre" className="mdc-theme--text-secondary-on-background">
      { wrap(error.stack) }
    </Caption>) : null;

  return (
    <div className="basis-error-container">
      <div className="row middle-xs">
        <div className="col-lg-offset-2 col-lg-1">
          <Icon value={iconName} size="48" />
        </div>
        <div className="col-lg-6">
          <Display1 component="h1" className="mdc-theme--text-primary-on-background">
            { status }
            .
            <small className="mdc-theme--text-secondary-on-background">
              { statusText }
            </small>
          </Display1>
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-lg-offset-3 col-lg-6">
          <Subheading1 component="h2" className="mdc-theme--text-primary-on-background">
            { message }
          </Subheading1>
          { stackTrace }
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </div>
    </div>
  );
};

export default material(ErrorView);