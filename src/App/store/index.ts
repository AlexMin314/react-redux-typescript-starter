/// <reference path="./index.d.ts" />
import createStore from '@/App/store/_storeConfig';

const { store, persistor } = createStore();
export { store, persistor };
