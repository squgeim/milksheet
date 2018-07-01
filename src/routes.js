import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import createBrowserRouter from 'history/createBrowserHistory';
import { Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import Login from './pages/login';
import Home from './pages/home';

export const history = createBrowserRouter();

const withIsLoggedIn = compose(
  withRouter,
  connect(state => ({
    isLoggedIn: state.user.id !== undefined,
  }))
);

const _LoggedInRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route {...rest}>
    {props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={ROUTES.LOGIN} from={props.path} />
      )
    }
  </Route>
);

const LoggedInRoute = withIsLoggedIn(_LoggedInRoute);

const _NonLoggedInRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route {...rest}>
    {props =>
      isLoggedIn ? (
        <Redirect to={props.history.from || ROUTES.ROOT} />
      ) : (
        <Component {...props} />
      )
    }
  </Route>
);

const NonLoggedInRoute = withIsLoggedIn(_NonLoggedInRoute);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <NonLoggedInRoute exact path={ROUTES.LOGIN} component={Login} />
      <LoggedInRoute path={ROUTES.ROOT} component={Home} />
    </Switch>
  </Router>
);

export default Routes;
