/// <reference path="./index.d.ts" />

import createStore, { InitState } from './_storeConfig';

const initState: InitState = {};
const store = createStore(initState);

export default store;
