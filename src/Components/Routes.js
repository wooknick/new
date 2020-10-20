import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import First from "../Routes/First";
import Second from "../Routes/Second";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Second} />
      <Route path="/v1" component={First} />
      <Route path="/v2" component={Second} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
