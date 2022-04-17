import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SignIn from './templates/auth/SignIn';
import SignUp from './templates/auth/SignUp';
import Home from './templates/home/Home';
import MyPage from './templates/mypage/MyPage';
import PostDetail from './templates/post/PostDetail';
import PostEdit from './templates/post/PostEdit';
import PostList from './templates/post/PostList';
import PostRegist from './templates/post/PostRegist';
import Profile from './templates/profile/Profile';
import TermsOfService from './templates/termsOfService/TermsOfService';
import PrivacyPolicy from './templates/privacyPolicy/PrivacyPolicy';
import EmailPost from './templates/auth/EmailPost';
import PasswordReset from './templates/auth/PasswordReset';
import Contact from './templates/contact/Contact';
import Top from './templates/top/Top';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/reset" component={EmailPost} />
        <Route path={'/password/reset(/?token=)?'} component={PasswordReset} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post/regist" component={PostRegist} />
        <Route path={'/post/edit(/:id)?'} component={PostEdit} />
        <Route exact path="/post/list" component={PostList} />
        <Route path={'/post/detail(/:id)?'} component={PostDetail} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/terms" component={TermsOfService} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
