import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignIn from './templates/auth/SignIn';
import SignUp from './templates/auth/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
