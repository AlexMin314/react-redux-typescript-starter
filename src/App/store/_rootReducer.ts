import { combineReducers, Reducer } from 'redux';
import { createReducer } from 'redux-act';
// import { mergeAll } from 'ramda';
// UTILS
import { registerReducers, mergeAll } from '@/App/utils/redux';
// MODELS
import configs, { ConfigsState } from '@Models/configs';
import forms, { FormsState } from '@Models/forms';
import profile, { ProfileState } from '@Models/profile';
import persist from '@Models/persist';
// TYPES
export interface Models<S> {
  reducer?: object;
  reducers: object;
  actions: object;
  initState: S;
}

/* update below when there is new module and models */
type AppMergedState = ConfigsState
  & ProfileState;

const models: Models<AppMergedState>[] = [
  /* add more models to be merged as one reducer */
  configs,
  profile,
];

export interface ApplicationState {
  app: AppMergedState;
  forms: FormsState;
}
// Merging actions, reducers, initState of the models of any modules into each object.
export const merged: Models<AppMergedState> = mergeAll([...models]);
// export const merged: Models<ApplicationState> = mergeModels(models);
// init app reducer.
const appReducer = createReducer<AppMergedState>({}, merged.initState);
const formsReducer = createReducer<FormsState>({}, forms.initState);
// register reducer logics to the app reducer.
registerReducers(appReducer, merged);
registerReducers(formsReducer, forms);

// each reducer that combined by combineReducers will not be allow to communicate each other.
const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  app: appReducer,
  forms: formsReducer,
});

export default (state: any, action: any) => {
  let initStates = state;
  const PURGE = persist.actions.purge.toString();
  if (action.type === PURGE) {
    sessionStorage.clear();
    initStates = persist.reducers[PURGE](initStates);
  }
  return rootReducer(initStates, action);
};
