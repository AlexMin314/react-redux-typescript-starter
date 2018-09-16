import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ACTIONS
import envs from '@/App/models/envs';
// UTILS
import { nothing } from '@Utils/functional';
// TYPES
import { Dispatch } from 'redux';
import { AppProps } from '@/App/App';
import { RouteProps } from 'react-router';

export type Connect = {
  actions: typeof envs.actions,
};

export type HOCprops = RouteProps
  & AppProps;

export interface ConnectedProps extends HOCprops, Connect {}

const withGateway = (ChildComponent: React.ComponentType<HOCprops>) => {

  class WithGateway extends PureComponent<ConnectedProps> {
    constructor(props: ConnectedProps) {
      super(props);
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const d = (dispatch: Dispatch) => ({
    action: bindActionCreators({ ...envs.actions }, dispatch),
  });

  return connect(nothing, d)(WithGateway);
};

export default withGateway;
