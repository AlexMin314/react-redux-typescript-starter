import { Map, is } from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';
// TYPES
import { Reducer } from 'redux-act';
import { Models } from '@/App/store/_rootReducer';

export const actionTypePrefixer = (module: string, model: string) =>
  (type: string): string =>
    `${module}/${model}/${type.toUpperCase()}`;

export const registerReducers = (reducer: Reducer<any>, m: any) => m.actions && Object.keys(m.actions).forEach(key => {
  reducer.on(m.actions[key], m.reducers[m.actions[key]]);
});

export const mergeAll = (models: Models<any>[]) => models.reduce((a, c) => {
  return ({
    actions: { ...a.actions, ...c.actions },
    reducers: { ...a.reducers, ...c.reducers },
    initState: a.initState.merge(c.initState),
  });
}, { actions: {}, reducers: {}, initState: Map() });

export const createImmutableEqualSelector = createSelectorCreator(defaultMemoize, is);
