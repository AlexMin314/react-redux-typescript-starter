import React, { PureComponent } from 'react';
// TYPES
import { RouteComponentProps, StaticContext } from 'react-router';
import { History as H } from 'history';
import { AppProps } from '../App';

export type RoutesProps = RouteComponentProps<Match, StaticContext, H.LocationState>;
// export interface ConnectedProps extends AppProps, RoutesProps {

// }
// export type ConnectedProps = RouteComponentProps<Match, StaticContext, H.LocationState>;
export type ConnectedProps = RoutesProps
  | AppProps;

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
