import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Create from "../Routes/Create";
import Result from "../Routes/Result";

const Routes = () => {
  return (
    <Switch>
      <Route path="/create" component={Create} />
      <Route path="/result" component={Result} />
      <Redirect from="*" to="/create" />
    </Switch>
  );
};

export default Routes;
