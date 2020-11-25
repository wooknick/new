import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import Read from "../Routes/Read";
import Create from "../Routes/Create";
import Normal from "../Routes/Normal";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/typeA" component={Normal} />
      <Route path="/typeB" component={Create} />
      <Route path="/typeC" component={Read} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
