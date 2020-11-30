import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import ResultTypeA from "../Routes/ResultTypeA";
import CreateTypeA from "../Routes/CreateTypeA";
import ResultTypeB from "../Routes/ResultTypeB";
import CreateTypeB from "../Routes/CreateTypeB";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create/a" component={CreateTypeA} />
      <Route path="/result/a" component={ResultTypeA} />
      <Route path="/create/b" component={CreateTypeB} />
      <Route path="/result/b" component={ResultTypeB} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
