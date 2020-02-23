import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './AppliedRoute';
import {
  Home,
  Register
} from "./containers";
import NotFound from './NotFound';

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
