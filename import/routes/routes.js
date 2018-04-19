import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const routes = (
  //NOTE: BrowserRouter
  <BrowserRouter >
      <Switch>
        {/*<PublicRoute exact path = "/" authed={!!Meteor.userId()} redirectTo="/link" component = {Login}/>*/}
        <Route exact path="/" render = {props => < Login {...props} />} />
        {/*}<Route exact path="/" component={Login} onEnter = {onEnterPublicPage}/>
        <Route exact path="/" component={Login} />*/}
        <Route path = "/signup" component = {Signup} />
        <Route path = "/dashboard" render = {props => < Dashboard {...props} />} />
        <Route path = "/dashboard/:id" render = {props => < Dashboard {...props} />} />
        {/*<PrivateRoute path="/link" authed={!!Meteor.userId()} redirectTo="/" component={clsLink}/>
        <Route path = "/signup" component = {Signup} onEnter = {onEnterPublicPage}/>
        <Route path = "/link" component = {clsLink} onEnter = {onEnterPrivatePage}/>
        */}
        <Route component = {NotFound}/>
      </Switch>
  </BrowserRouter>
  );
