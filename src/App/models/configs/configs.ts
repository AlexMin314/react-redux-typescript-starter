import { createAction } from 'redux-act';
import cuid from 'cuid';
import { detect } from 'detect-browser';
import { Map } from 'immutable';
// UTILS
import { actionTypePrefixer } from '@Utils/redux';
// CONSTANT
import { CONFIG as C } from '@Constants/config';
export const modelPath = 'configs';
// ACTION TYPE HELPER
const actionType = actionTypePrefixer('App', modelPath);
// TYPES
export interface ConfigsState extends Map<string, any> {
  [C.NODE_ENV]?: string;
  [C.SERVER_ENV]?: string;
  [C.SESSION_ID]?: string;
  [C.ENTRY_URL]?: string;
  [C.BROWSER]?: any;
  [C.IS_LANDSCAPE]?: boolean;
  [C.IS_LOADING]?: boolean;
  [C.ALLOW_NEW_CUSTOMER]?: boolean;
}
export interface ConfigsPayload {
  [C.ENTRY_URL]?: string;
  [C.IS_LANDSCAPE]?: boolean;
  [C.IS_LOADING]?: boolean;
  [C.ALLOW_NEW_CUSTOMER]?: boolean;
}

type Mutators = Mutator<ConfigsPayload, ConfigsState>;

// INIT STATES
const configsState: ConfigsState = Map({
  [modelPath]: Map({
    [C.IS_LANDSCAPE]: false,
    [C.IS_LOADING]: false,
    [C.ALLOW_NEW_CUSTOMER]: true,
  }),
});

// ACTIONS
export const actions = {
  setInitConfigs: createAction<string, {}>(actionType('set_Configs')),
  updateConfigs: createAction<ConfigsPayload, {}>(actionType('update_Configs'), (payload) => ({ ...payload })),
  setResponsive: createAction<boolean, {}>(actionType('set_responsive_info')),
  setLoading: createAction<boolean, {}>(actionType('set_loading')),
};

// MUTATORS (Logics of Reducer)
export const setInitConfigs: Mutators = (payload) => (state) => {
  return state
    .setIn([modelPath, C.NODE_ENV], process.env.NODE_ENV)
    .setIn([modelPath, C.SERVER_ENV], process.env.SERVER_ENV)
    .setIn([modelPath, C.SESSION_ID], cuid())
    .setIn([modelPath, C.ENTRY_URL], payload)
    .setIn([modelPath, C.BROWSER], detect());
};
export const updateConfigs: Mutators = (payload) => (state) => {
  const prev = state.get(modelPath);
  return state.set(modelPath, prev.merge(payload));
};
export const setResponsive: Mutators = (payload) => (state) =>
  state.setIn([modelPath, C.IS_LANDSCAPE], payload);

export const setLoading: Mutators = (payload) => (state) =>
  state.setIn([modelPath, C.IS_LOADING], payload);

// REDUCERS
const reducers = {
  [actions.setInitConfigs.toString()]: (state: ConfigsState, payload: ConfigsPayload) => setInitConfigs(payload)(state),
  [actions.updateConfigs.toString()]: (state: ConfigsState, payload: ConfigsPayload) => updateConfigs(payload)(state),
  [actions.setResponsive.toString()]: (state: ConfigsState, payload: ConfigsPayload) => setResponsive(payload)(state),
  [actions.setLoading.toString()]: (state: ConfigsState, payload: ConfigsPayload) => setLoading(payload)(state),
};

// EXPORT DUCKS
export default {
  reducers,
  actions,
  initState: configsState,
};
