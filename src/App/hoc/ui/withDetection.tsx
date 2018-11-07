import React, { Component } from 'react';
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ACTIONS
import configs from '@Models/configs';
// UTILS
// import throttle from 'lodash/throttle';
import debounce from 'lodash/throttle';
// TYPES
import { Dispatch } from 'redux';
import { IAppProps } from '@/App/App';
import { RouteComponentProps } from 'react-router';

export type Connect = {
  action: typeof configs.actions,
};

export interface IConnectedProps extends RouteComponentProps<any>, IAppProps, Connect {}

// HELPERS
const _orientation = (screen as any).msOrientation
  || (screen as any).orientation
  || (screen as any).mozOrientation
  || {};
const _regardAsLandscape = () => window.innerHeight < 600 || _orientation.angle === 90;
const ms = 100;

const withDetection = (ChildComponent: React.ComponentType<IConnectedProps>) => {
  class WithDetection extends Component<IConnectedProps> {
    _updateDimensions = () => this.props.action.setResponsive(_regardAsLandscape());

    componentDidMount() {
      this._updateDimensions();
      window.addEventListener('resize', debounce(this._updateDimensions, ms));
      window.addEventListener('orientationchange', debounce(this._updateDimensions, ms));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', debounce(this._updateDimensions, ms));
      window.removeEventListener('orientationchange', debounce(this._updateDimensions, ms));
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const d = (dispatch: Dispatch) => ({
    action: bindActionCreators({ ...configs.actions }, dispatch),
  });

  return connect(() => ({}), d)(WithDetection);
};
export default withDetection;
