import { createAction } from 'redux-act';
import { Map } from 'immutable';
// TYPES
export interface PersistState extends Map<string, any> {}
export interface PersistPayload {}

// ACTIONS
export const actions = {
  purge: createAction('PURGE_STATE_AND_SESSION'),
};

// REDUCERS
const reducers = {
  [actions.purge.toString()]: (state: any): any => undefined,
};

export default {
  reducers,
  actions,
};
