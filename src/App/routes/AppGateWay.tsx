import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ACTIONS
import configs from '@Models/configs';
import persist from '@Models/persist';
// TYPES
import { Dispatch } from 'redux';
import { IAppProps } from '@/App/App';
import { RouteComponentProps } from 'react-router';

export type Connect = {
  Config: typeof configs.actions & typeof persist.actions,
};

export type HOCprops = RouteComponentProps<any>
  & IAppProps;

export interface IConnectedProps extends HOCprops, Connect {}

const appGateWay = (ChildComponent: React.ComponentType<HOCprops>) => {
  // Gateway logic can be here...
  /**
   * Things need to think about
   * 1. url parse and reformatting?
   *  - prod type, channel, campaignId...
   * 2. channel base process
   *  - pruaccess, edm, crm, doms..
   * 3. get leadGenFlag
   */

  class AppGateWay extends Component<IConnectedProps> {
    constructor(props: IConnectedProps) {
      super(props);
      const { Config, location } = this.props;
      // Gateway logic can be here...

      // Temp Logic: clear state and sessionStore
      if (location.pathname.includes('entry')) {
        Config.purge();
      }
      Config.setInitConfigs(location.pathname);
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const d = (dispatch: Dispatch) => ({
    Config: bindActionCreators({ ...configs.actions, ...persist.actions }, dispatch),
  });

  return connect(() => ({}), d)(AppGateWay);
};

export default appGateWay;
