import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// renderReactView
export default (res, view, title, componentType, props) => {

  const element = React.createElement(componentType, props, null);
  const markup = renderToStaticMarkup(element);

  res.render(view, { title, markup });
};