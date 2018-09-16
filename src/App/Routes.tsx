import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// CONTAINERS
import Entry from '@/Entry';
import Estimation from '@/Estimation';
import Help from '@/Help';
// TYPES
export interface RouteProps {}
export interface RouteState {}

class Routes extends Component<RouteProps, RouteState> {
  render() {
    return (
      <Switch>
        <Route exact={true} path={'/entry'} component={Entry} />
        {/* <Route exact={true} path={'/pas_entry'} component={Entry} /> */}
        {/* <Route exact={true} path="/entry/:prod" component={Entry}/> */}
        <Route exact={true} path="/estimation" component={Estimation} />
        <Route path="" component={Help}/>
      </Switch>
    );
  }
}

export default Routes;
