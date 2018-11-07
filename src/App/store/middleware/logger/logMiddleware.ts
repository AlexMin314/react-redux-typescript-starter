import logger, { enableLogs, initLogLevel } from '@/App/store/middleware/logger/logger';
import { logFormattedState } from '@/App/store/middleware/logger/formatter';
import { getFilterList } from '@/App/store/middleware/logger/filter';
// import { registerOnError } from './errorHandlers';

// Types
import { Middleware, Dispatch, Store } from 'redux';
import { Action } from 'redux-act';
import { LogLevel, Option, P, M } from '@/App/store/middleware/logger/types';

// Redux middleware : option => store => next => action;
const logMiddleware = (option: Option<LogLevel>): Middleware => ((store: Store) => {
  let prevState = {};
  let sequence = 0;
  const { logState = true } = option;
  // [INIT] config helpers and register global methods
  const isLogEnabled = enableLogs(window.btoa(option.pw), logger);
  const isAllowedLevel = initLogLevel(option.logLevel, isLogEnabled, logger);
  const filterCheck = getFilterList(option);
  // registerOnError(window, logger);

  return (next: Dispatch<Action<P, M>>) => (action: Action<P, M>) => {

    if (logState && isLogEnabled() && isAllowedLevel() && filterCheck(action)) {
      prevState = store.getState();
      const url = window.location.href;
      setTimeout(() => {
        sequence += 1;
        const nextState = store.getState();
        logFormattedState(
          prevState,
          nextState,
          action,
          sequence,
          url,
          logger,
        );
      }, 50);
    }

    // calling next middleware
    next(action);
  };
}) as Middleware;

export default logMiddleware;
