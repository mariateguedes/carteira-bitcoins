import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Register from "./features/register/Register";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/register" exact component={Register} />
    </BrowserRouter>
  );
}

export default Routes;
