import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import ReadTypeA from "../Routes/ReadTypeA";
import CreateTypeA from "../Routes/CreateTypeA";
import ReadTypeB from "../Routes/ReadTypeB";
import CreateTypeB from "../Routes/CreateTypeB";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create/a" component={CreateTypeA} />
      <Route path="/read/a" component={ReadTypeA} />
      <Route path="/create/b" component={CreateTypeB} />
      <Route path="/read/b" component={ReadTypeB} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
