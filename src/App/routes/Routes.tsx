import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// CONTAINERS
import Entry from '@/Entry';
import Estimation from '@/Estimation';
import Login from '@/Login';
import Application from '@/Application';
import Help from '@/Help';
// TYPES

export interface IRouteProps {}

class Routes extends Component<IRouteProps> {
  render() {
    return (
      <Switch>
        <Route exact={true} path={'/pas_entry'} component={Entry} />
        <Route path={'/estimation'} component={Estimation} />
        <Route path={'/login'} component={Login} />
        <Route path={'/application'} component={Application} />
        <Route path={'/getHelp'} component={Help} />
        <Route path="" component={Help}/>
      </Switch>
    );
  }
}

export default Routes;
