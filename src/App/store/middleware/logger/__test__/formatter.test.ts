import {
  logFormattedState,
  logFormattedError,
  _logOnRequest,
  _logOnResponse,
  _logOnResponseError,
} from '@/App/store/middleware/logger/formatter';
import { mockedLogger as logger } from '@/App/store/middleware/logger/__test__/logger.test';
// TYPES
import {
  LogLevel,
  LogOnRequest,
  LogOnResponse,
} from '@/App/store/middleware/logger/types';

describe('Logger Middleware - formatter', () => {

  let logOnRequest: LogOnRequest;
  let logOnResponse: LogOnResponse;
  let logOnResponseError: LogOnResponse;

  beforeEach(() => {
    jest.resetAllMocks();
    logOnRequest = _logOnRequest(logger);
    logOnResponse = _logOnResponse(logger);
    logOnResponseError = _logOnResponseError(logger);
    (window as any).console = logger;
    (window as any).gle = () => true;
    (window as any).glv = () => LogLevel.INFO;
  });

  const mockReq = {
    method: 'POST',
    url: '/test',
    data: {
      name: 'alex',
    },
  };

  const mockRes = {
    config: {
      method: 'POST',
      url: '/test',
    },
    data: {
      name: 'alex',
    },
    status: 200,
    statusText: 'success',
  };

  test('logFormattedState should log as expected.', () => {
    const mockAction = {
      payload: {
        data: {
          name: 'alex',
        },
      },
      type: '[Test]',
      error: true,
      meta: {},
    };
    logFormattedState({}, {}, mockAction, 1, '/path', logger);
    expect(logger.log).toHaveBeenCalled();
    expect(logger.groupCollapsed).toHaveBeenCalled();
    expect(logger.groupEnd).toHaveBeenCalled();
    expect(logger.trace).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });

  test('logFormattedError should log as expected when logger is passed.', () => {
    logFormattedError('hello', {}, logger);
    expect(logger.error).toHaveBeenCalled();
  });

  test('logFormattedError should log as expected when logger is not passed.', () => {
    logFormattedError('hello', {});
    expect(logger.error).toHaveBeenCalled();
  });

  test('logOnRequest should log as expected when window methods are declared properly.', () => {
    logOnRequest(mockReq);
    expect(window.console.log).toHaveBeenCalled();
  });

  test('logOnRequest should log as expected when window methods are not declared properly.', () => {
    window.gle = null;
    logOnRequest(mockReq);
    expect(logger.log).not.toHaveBeenCalled();
  });

  test('logOnResponse should log as expected when window methods are not declared properly.', () => {
    logOnResponse(mockRes);
    expect(logger.log).toHaveBeenCalled();
  });

  test('logOnResponseError should log as expected when window methods are not declared properly.', () => {
    logOnResponseError(mockRes);
    expect(logger.log).toHaveBeenCalled();
  });
});
