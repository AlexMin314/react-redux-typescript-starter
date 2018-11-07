import React, { Component } from 'react';
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ACTIONS
import forms, { getInputState } from '@Models/forms';
import { push } from 'connected-react-router';
// UTILS
import { pipe } from 'ramda';
import { ifElse, identity } from '@Utils/functional';
// TYPES
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { InitPayload as Config } from '@Models/forms';

export type Connect = {
  Form: typeof forms.actions,
};

// HELPERS
export const prefillByModuleNameHandler = (props: any) => (config: Config) => {
  const { module, inputs } = config;
  const prefilledInputs = inputs.map(input => {
    return ({
      ...input,
      initValue: props[input.name].get('value'),
    });
  });
  return ({
    module,
    inputs: prefilledInputs,
  });
};

export interface IConnectedProps extends RouteComponentProps<any>, Connect {}

const withFormConnect = (
    config: Config,
    prefillByModuleName: boolean = true,
  ) => (ChildComponent: React.ComponentType<IConnectedProps>) => {

    class WithFormConnect extends Component<IConnectedProps> {
      constructor(props: IConnectedProps) {
        super(props);
        const { Form } = this.props;
        // init
        pipe(
          ifElse(() => prefillByModuleName, prefillByModuleNameHandler(this.props), identity), // (predicate, if, else)
          Form.setInitValueAndRules,
        )(config);
      }

      render() {
        return <ChildComponent {...this.props} />;
      }
    }

    const s = (state: any) => config.inputs.reduce((a, c) => {
      a[c.name] = getInputState({
        module: config.module,
        ...c,
      })(state);
      return a;
    }, ({} as any));

    const d = (dispatch: Dispatch) => ({
      Form: bindActionCreators({ ...forms.actions }, dispatch),
      Navigation: bindActionCreators({ push }, dispatch),
    });

    return connect(s, d)(WithFormConnect);
  };

export default withFormConnect;
