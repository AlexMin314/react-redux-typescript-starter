import React, { PureComponent } from 'react';
// TYPES
import { AppProps } from '@/App/App';
import { RouteProps } from 'react-router';

export type ConnectedProps = RouteProps
  & AppProps;

const withGateway = (ChildComponent: React.ComponentType<ConnectedProps>) => {

  class WithGateway extends PureComponent<ConnectedProps> {
    constructor(props: ConnectedProps) {
      super(props);
      console.log(props);
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return WithGateway;
};

export default withGateway;
