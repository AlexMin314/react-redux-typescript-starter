/// <reference path="./index.d.ts" />
import { Map } from 'immutable';
import createStore, { InitState } from '@/App/store/_storeConfig';

const initState: InitState = Map();
const store = createStore(initState);

export default store;
