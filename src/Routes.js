import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './AppliedRoute';
import {
  Home,
  Login,
  Register,
  Market,
  Collections,
  Guides
} from "./containers";
import NotFound from './NotFound';

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
      <AppliedRoute path="/marketplace" exact component={Market} appProps={appProps} />
      <AppliedRoute path="/collections" exact component={Collections} appProps={appProps} />
      <AppliedRoute path="/guides" exact component={Guides} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
