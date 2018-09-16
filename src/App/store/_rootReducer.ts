import { combineReducers, Reducer } from 'redux';
import { createReducer, Reducer as ActReducer } from 'redux-act';
import { mergeAll } from 'ramda';
import { Map } from 'immutable';
// UTILS
import { registerReducers } from '@/App/utils/redux';
// MODELS
import envs, { EnvsState } from '@/App/models/envs';

// TYPES
export interface Models<S> {
  reducer?: object;
  reducers: object;
  actions: object;
  initState: S;
}

/* update below when there is new module and models */
type AppMergedState = Map<string, any>
  & EnvsState;

const models: Models<AppMergedState>[] = [
  /* add more models to be merged as one reducer */
  envs,
];

export interface ApplicationState {
  app: AppMergedState;
}
// Merging actions, reducers, initState of the models of any modules into each object.
export const merged: Models<AppMergedState> = mergeAll([{ actions:{}, reducers:{}, initState:{} }, ...models]);
// export const merged: Models<ApplicationState> = mergeModels(models);
// init app reducer.
const appReducer: ActReducer<AppMergedState> = createReducer<AppMergedState>({}, merged.initState);
// register reducer logics to the app reducer.
registerReducers(appReducer, merged);

// each reducer that combined by combineReducers will not be allow to communicate each other.
const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  app: appReducer,
});

export default rootReducer;
