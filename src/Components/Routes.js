import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Read from "../Routes/Read";
import Create from "../Routes/Create";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Create} />
      <Route path="/create" component={Create} />
      <Route path="/read" component={Read} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
