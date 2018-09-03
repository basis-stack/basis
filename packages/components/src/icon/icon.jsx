import React from 'react';
import classNames from 'classnames';

export default ({ value, size = 24, inverse = false, inactive = false }) => {

  const fontAwesome = value.startsWith('fa-');
  const content = !fontAwesome ? value : null;
  const baseCssClass = fontAwesome ? `fa ${value}` : 'material-icons';
  const classes = classNames(baseCssClass,
                             `md-${size}`,
                             inverse ? 'md-light' : 'md-dark',
                             inactive ? 'md-inactive' : '');

  return <i className={classes} data-icon={value}>{ content }</i>;
};