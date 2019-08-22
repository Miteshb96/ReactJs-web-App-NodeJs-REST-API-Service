import React from "react";
import { Switch, Route } from "react-router-dom";
import { default as RoutePrivate } from "./AuthRoute";
import {Login, Register, AddThread, ThreadList} from "../src/container";

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <RoutePrivate exact path="/threadList" component={ThreadList} />
    <RoutePrivate exact path="/addThread" component={AddThread} />
  </Switch>
);
