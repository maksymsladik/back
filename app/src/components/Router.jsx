import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Articles from "./pages/Articles";
import UserArticles from "./pages/UserArticles";

function Router({ access }) {
  if (access === "") return false;

  return !access ? (
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/auth" component={AuthForm} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/my-articles" component={UserArticles} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;
