import { createAction, createReducer } from 'redux-act';
import { actionTypePrefixer, registerReducers } from '@/App/utils/redux';

describe('_Core utils - redux.ts', () => {
  test('actionTypePrefixer should return proper srting', () => {
    const prefix = actionTypePrefixer('App', 'Module');
    expect(prefix('action')).toBe('[App]Module/ACTION');
  });
  test('registerReducers should work properly', () => {
    const mockModel = {
      actions: {
        add: createAction(),
      },
      reducers: {
        add: (state: any, action: any) => state + action.payload,
      },
      InitState: {},
    };
    const sub = createAction();
    const mockReducer =  createReducer<object>({}, mockModel.InitState);
    registerReducers(mockReducer, mockModel);
    expect(mockReducer.has(mockModel.actions.add)).toBe(true);
    expect(mockReducer.has(sub)).toBe(false);
  });
});
