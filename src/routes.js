import React from 'react';
import createBrowserRouter from 'history/createBrowserHistory';
import { Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import Login from './pages/login';

export const history = createBrowserRouter();

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </Router>
  );
}

export default Routes;