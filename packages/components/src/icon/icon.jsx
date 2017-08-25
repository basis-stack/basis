import React from 'react';
import classNames from 'classnames';

export default (props) => {

  const fontAwesome = props.value.startsWith('fa-');
  const size = props.size || 24;
  const inverse = props.inverse !== undefined;
  const inactive = props.inactive !== undefined;
  const content = !fontAwesome ? props.value : null;
  const baseCssClass = fontAwesome ? `fa ${props.value}` : 'material-icons';

  const classes = classNames(
    baseCssClass,
    `md-${size}`,
    inverse ? 'md-light' : 'md-dark',
    inactive ? 'md-inactive' : ''
  );

  return <i className={classes} data-icon={props.value}>{ content }</i>;
};