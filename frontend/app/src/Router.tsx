import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SignIn from './templates/auth/SignIn';
import SignUp from './templates/auth/SignUp';
import PostRegist from './templates/post/PostRegist';
import Profile from './templates/profile/Profile';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post/regist" component={PostRegist} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
