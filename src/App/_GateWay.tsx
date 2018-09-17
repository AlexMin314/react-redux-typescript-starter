import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ACTIONS
import envs from '@/App/models/envs';
// TYPES
import { Dispatch } from 'redux';
import { AppProps } from '@/App/App';
import { RouteProps } from 'react-router';

export type Connect = {
  action: typeof envs.actions,
};

export type HOCprops = RouteProps
  & AppProps;

export interface ConnectedProps extends HOCprops, Connect {}

const appGateWay = (ChildComponent: React.ComponentType<HOCprops>) => {

  class AppGateWay extends PureComponent<ConnectedProps> {
    constructor(props: ConnectedProps) {
      super(props);
      this.props.action.setEnvs(this.props.location.pathname);
      // Gateway logic can be here...
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const d = (dispatch: Dispatch) => ({
    action: bindActionCreators({ ...envs.actions }, dispatch),
  });

  return connect(() => ({}), d)(AppGateWay);
};

export default appGateWay;
