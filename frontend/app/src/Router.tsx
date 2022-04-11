import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import SignIn from './templates/auth/SignIn';
import SignUp from './templates/auth/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
