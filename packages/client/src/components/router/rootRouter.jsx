import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routeTypes from './../../constants/routeTypes';

export default ({ routes }) => {

  const getRoute = (routeConfig, index) => {

    const props = {
      key: index,
      path: routeConfig.path,
      component: routeConfig.component,
      exact: routeConfig.type === routeTypes.page
    };

    return <Route {...props} />;
  };

  return (
    <Switch>
      { routes.filter(r => r.type === routeTypes.page ||
                          r.type === routeTypes.shellHub)
              .map(getRoute) }
      {/* TODO: Need to add a wildcard / not found route here...and use the ErrorView from basis-components */}
    </Switch>
  );
};