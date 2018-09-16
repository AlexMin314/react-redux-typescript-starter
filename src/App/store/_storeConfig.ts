import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// INTERNALS
import rootReducer from '@/App/store/_rootReducer';
import rootEpic from '@/App/store/_rootEpic';
import { logMiddleware } from '@/App/store/middleware/logger';
// TYPES
import { Store } from 'redux';
import { Action } from 'redux-act';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { ApplicationState } from '@/App/store/_rootReducer';

export type InitState = {};
export type EpicDependancies = {};

export default function configureStore(initialState?: InitState): Store<ApplicationState> {
  // #1 Route history
  const history = createBrowserHistory();

  // #2 Observable
  const epic$ = new BehaviorSubject(rootEpic);
  const epicMiddleware = createEpicMiddleware();

  // #3 Middlewares
  const middlewares = [
    epicMiddleware,
    logMiddleware({
      pw: process.env.LOG_P,
      blackListed: ['@@'],
    }),
    routerMiddleware(history),
  ];

  // #4 Enhancers
  const composeEnhancers = composeWithDevTools({});

  // #5 Hot Module Reloading
  const hotReloadingEpic = (
    $action: ActionsObservable<Action<P, M>>,
    $state: StateObservable<void>,
    dependancies: EpicDependancies,
  ) =>
    epic$.pipe(
      switchMap((epic) => epic($action, $state, dependancies)),
    );
  epicMiddleware.run(hotReloadingEpic);
  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('./_rootReducer', () => {
      store.replaceReducer(connectRouter(history)(rootReducer));
    });
    module.hot.accept('./_rootEpic', () => {
      const nextRootEpic = require('./_rootEpic');
      epic$.next(nextRootEpic);
    });
  }

  // # Create Stroe
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState!,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}
