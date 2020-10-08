import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import First from "../Routes/First";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={First} />
      <Route path="/v1" component={First} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
