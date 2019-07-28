import React from 'react';

import { Switch } from 'react-router-dom';

import Signin from '../pages/Signin';
import SignUp from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
