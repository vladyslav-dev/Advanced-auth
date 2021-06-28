import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../../components/Login/Login.jsx";
import Registration from "../../components/Registration/Registration.jsx";

const Authentication = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Authentication;
