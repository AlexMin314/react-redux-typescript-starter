import { createAction } from 'redux-act';
import { fromJS } from 'immutable';
// UTILS
import {
  actionTypePrefixer,
  andSeq,
  matchChannel,
  matchProduct,
} from '@Utils';
// CONSTS
import { CHANNEL, PRODUCT } from '@Constants';
// ACTION TYPE HELPER
const actionType = actionTypePrefixer('App', 'envs');
// TYPES
export interface EnvsState {
  showConsent: boolean;
}
export interface EnvsPayload {
  data: {
    prod: string,
    ch: string,
  };
}
// INIT STATES
const envsState: EnvsState = fromJS({
  showConsent: false,
});

// ACTIONS
const a = {
  setShowConsent: createAction<string, string, {}>(actionType('set_show_Consent'), (prod: string, ch: string) => ({ data: { prod, ch } })),
};

// MUTATORS (Logics of Reducer)
export const processShowConsent: Mutator<EnvsPayload, EnvsState> =
  ({ data }) => (state) => {
    const showConsent = andSeq(
      matchProduct(PRODUCT.PTV.TYPE)(data.prod),
      matchChannel(CHANNEL.DIA)(data.ch),
    );
    return ({ ...state, showConsent });
  };

// REDUCERS
const r = {
  setShowConsent: (state: EnvsState, payload: EnvsPayload) => processShowConsent(payload)(state),
};

// EXPORT DUCKS
export default {
  reducers: r,
  actions: a,
  initState: envsState,
};
