// TYPES
import { Reducer } from 'redux-act';

export const actionTypePrefixer = (module: string, model: string) =>
  (type: string): string =>
    `[${module}]${model}/${type.toUpperCase()}`;

export const registerReducers = (reducer: Reducer<any>, m: any) => m.actions && Object.keys(m.actions).forEach(key => {
  reducer.on(m.actions[key], m.reducers[key]);
});
