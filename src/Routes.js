import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './AppliedRoute';
import { RedirectRoute } from './components';
import {
  Home,
  User,
  UserSales,
  Login,
  Register,
  Auth,
  Privacy,
  Market,
  Item,
  Collections,
  Guides
} from "./containers";
import NotFound from './NotFound';

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/user" exact component={User} appProps={appProps} />
      <AppliedRoute path="/user/sales" exact component={UserSales} appProps={appProps} />
      <RedirectRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
      <AppliedRoute path="/registered" exact component={Auth} appProps={appProps} />
      <AppliedRoute path="/privacy" exact component={Privacy} appProps={appProps} />
      <AppliedRoute path="/marketplace" exact component={Market} appProps={appProps} />
      <AppliedRoute path="/items/:id" exact component={Item} appProps={appProps} />
      <AppliedRoute path="/collections" exact component={Collections} appProps={appProps} />
      <AppliedRoute path="/guides" exact component={Guides} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
