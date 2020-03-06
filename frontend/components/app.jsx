import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SplashPageContainer from './splash_page/splash_page_container';
import SigninContainer from './session//signin_container';
import SignupContainer from './session/signup_container';
import { AuthRoute } from '../util/route_util';
import { ProtectedRoute } from '../util/protect_util';
import MainFeed from './main/feed';
import ShowPage from './show_page/show_page';
import ShowPageContainer from './show_page/show_page_container';


const App = (props) => {
  return(<div>
    <Switch>
      <ProtectedRoute path="/show/:ticker" component={ShowPageContainer} />
      <ProtectedRoute path="/feed" component={MainFeed} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <AuthRoute path="/signin" component={SigninContainer} />
      <AuthRoute path="/" component={SplashPageContainer}/>
    </Switch>
  </div>)
};

export default App;