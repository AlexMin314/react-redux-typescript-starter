import { default as myLogger } from '@/App/store/middleware/logger/logger';
// Types
import {
  Mapper,
  LogLevel,
  Logger,
  LogFormattedState,
  LogFormattedError,
  LogOnRequest,
  LogOnResponse,
  LogResponses,
} from '@/App/store/middleware/logger/types';

enum STYLE {
  ERROR = '#FF0000',
  LABEL = '#1E90FF',
  ONRES = '#9ACD32',
  ONACT = '#191970',
  ONREQ = '#4169E1',
}

const mapper: Mapper = (obj, logger, isError?) => {
  if (typeof obj === 'object') {
    const data = new Map(Object.entries(obj));
    data.forEach(key => logger.log(
      `%c ${key} %c(${typeof data.get(key)}): `,
      `color: ${isError ? STYLE.ERROR : STYLE.LABEL}; font-weight: bold;`,
      'color: gray;',
      data.get(key),
    ));
  }
};

export const logFormattedState: LogFormattedState = (
  prevState,
  nextState,
  currentAction,
  sequence,
  url,
  logger,
) => {
  /* tslint:disable:ter-indent */
  logger.groupCollapsed(
    `%c [Action-${sequence}] %c ${currentAction.type}`,
    `color: white; background: ${STYLE.ONACT};`,
    'color: black; background: white;',
  );
    logger.groupCollapsed('Prev State: ');
      logger.log(prevState);
    logger.groupEnd();
    logger.groupCollapsed('Next State: ');
      logger.log(nextState);
    logger.groupEnd();
    logger.group('Action Payload: ');
      mapper(currentAction.payload && currentAction.payload.data, logger);
      currentAction.meta && logger.log('Meta: ', currentAction.meta);
      currentAction.error && logger.error('Error: ', currentAction.error);
    logger.groupEnd();
    logger.log('%cURL: ', 'font-weight: bold;', url);
    logger.groupCollapsed('Stack Trace: ');
      logger.trace(' ');
    logger.groupEnd();
  logger.groupEnd();
  /* tslint:enable:ter-indent */
};

export const logFormattedError: LogFormattedError = (
  message,
  error,
  logger = window.console,
) => {
  logger.error(`[Error] ${error.stack}`);
  return {
    message,
    stack: error.stack,
    time: new Date(),
    session: error.session,
    url: window.location.pathname,
  };
};

export const _logOnRequest = (logger: Logger): LogOnRequest => (request) => {
  if (typeof window.gle !== 'function') return;
  const logLevel = window.glv();
  if (window.gle()
    && logLevel !== LogLevel.WARN
    && logLevel !== LogLevel.ERROR
  ) {
    /* tslint:disable:ter-indent */
    logger.groupCollapsed(
      `%c [Request-${request.method}] ${request.url}`,
      `color: ${STYLE.ONREQ};`,
    );
      if (request.data) {
        logger.group('Payload: ');
          mapper(request.data, logger);
        logger.groupEnd();
      }
    logger.groupEnd();
    /* tslint:enable:ter-indent */
  }
};

const _logResponses: LogResponses = (response, logger, isError?)  => {
  const logLevel = window.glv();
  if (window.gle()
    && logLevel !== LogLevel.WARN
    && logLevel !== LogLevel.ERROR
  ) {
    /* tslint:disable:ter-indent */
    logger.groupCollapsed(
      `%c [${isError ? 'ERROR-Response' : 'Response'}-${response.config.method}] ${response.config.url}`,
      `color: ${isError ? STYLE.ERROR : STYLE.ONREQ};`,
    );
      if (response.data) {
        logger.group('Payload: ');
          mapper(response.data, logger, isError);
        logger.groupEnd();
        logger.log('Status: ', response.status);
        response.statusText && logger.log('statusText: ', response.statusText);
      }
    logger.groupEnd();
    /* tslint:enable:ter-indent */
  }
};

export const _logOnResponse = (l: Logger): LogOnResponse => (response) =>
  typeof window.gle === 'function'
    && window.gle()
    && _logResponses(response, l);

export const _logOnResponseError = (l: Logger): LogOnResponse => (response) =>
  typeof window.gle === 'function'
    && window.gle()
    && _logResponses(response, l, true);

export const logOnRequest = _logOnRequest(myLogger);
export const logOnResponse = _logOnResponse(myLogger);
export const logOnResponseError = _logOnResponseError(myLogger);
