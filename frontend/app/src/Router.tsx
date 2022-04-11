import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignUp from './templates/auth/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
