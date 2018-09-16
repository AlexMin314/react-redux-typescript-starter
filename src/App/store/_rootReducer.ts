import { combineReducers, Reducer } from 'redux';
import { createReducer, Reducer as ActReducer } from 'redux-act';
import { mergeAll } from 'ramda';
// UTILS
import { registerReducers } from '@Utils/redux';
// MODELS

// TYPES
export interface Models<S> {
  reducer?: object;
  reducers: object;
  actions: object;
  initState: S;
}

/* update below when there is new module and models */
type AppMergedState = any;

const models: Models<ApplicationState>[] = [
  /* add more models to be merged as one reducer */
];

export interface ApplicationState {
  app: AppMergedState;
}

// Merging actions, reducers, initState of the models of any modules into each object.
const merged: Models<ApplicationState> = mergeAll([{ actions:{}, reducers:{}, initState:{} }, ...models]);
// init app reducer.
const appReducer: ActReducer<AppMergedState> = createReducer<AppMergedState>({}, merged.initState);
// register reducer logics to the app reducer.
registerReducers(appReducer, merged);

// each reducer that combined by combineReducers will not be allow to communicate each other.
const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  app: appReducer,
});

export default rootReducer;
