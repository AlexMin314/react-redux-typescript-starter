// Redux
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// Redux-act
import { disbatch } from 'redux-act';
// Thunk
import thunk from 'redux-thunk';
// Redux-persist
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage/session';
// Router
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// INTERNALS
import rootReducer from '@/App/store/_rootReducer';
import { logMiddleware } from '@/App/store/middleware/logger';
// CONFIGS
import { BASE_URL } from '@/App/configs';
// TYPES
import { Store } from 'redux';
import { ApplicationState } from '@/App/store/_rootReducer';
import { Persistor } from 'redux-persist';

export type InitState = {};
export type EpicDependancies = {
  axios: any;
};
interface CreateStore<S> {
  store: Store<S>;
  persistor: Persistor;
}

export const history = createBrowserHistory({
  basename: BASE_URL,
});

export const persistConfig: any = {
  storage,
  key: 'root',
  whitelist: ['app', 'forms'],
  timeout: null,
  transforms: [
    immutableTransform({
      whitelist: ['app', 'forms'],
    }),
  ],
};

export default function configureStore(initialState?: InitState): CreateStore<ApplicationState> {

  // # Middlewares
  const middlewares = [
    thunk as any,
    routerMiddleware(history),
    logMiddleware({
      pw: process.env.LOG_P,
      blackListed: ['@@'],
    }),
  ];

  // # Enhancers
  const composeEnhancers = composeWithDevTools({});

  // # Create Store
  const store = createStore(
    persistReducer(persistConfig, connectRouter(history)(rootReducer)),
    initialState!,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  disbatch(store);
  const persistor = persistStore(store);

  // # Hot Module Reloading
  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('./_rootReducer', () => {
      store.replaceReducer(persistReducer(persistConfig, connectRouter(history)(rootReducer)));
    });
  }

  return { store, persistor };
}
