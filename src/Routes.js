import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Market,
  Collections,
  Guides
} from "./containers";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/marketplace" exact component={Market} />
      <Route path="/collections" exact component={Collections} />
      <Route path="/guides" exact component={Guides} />
    </Switch>
  );
}

export default Routes;
