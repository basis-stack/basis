import React from 'react';
import classNames from 'classnames';

export default (props) => {

  const size = props.size || 24;
  const inverse = props.inverse !== undefined ? props.inverse : false;
  const active = props.active !== undefined ? props.active : true;

  const classes = classNames(
    'material-icons',
    `md-${size}`,
    inverse ? 'md-light' : 'md-dark',
    !active ? 'md-inactive' : ''
  );

  return <i className={classes} data-icon={props.value}>{ props.value }</i>;
};