import logMiddleware from '@/App/store/middleware/logger/logMiddleware';
import { LogLevel } from '@/App/store/middleware/logger/types';

describe('Logger Middleware - logMiddleware', () => {

  const store = {
    getState: jest.fn(),
    dispatch: jest.fn(),
  };

  const option = {
    pw: 'test',
    logLevel: LogLevel.INFO,
    logState: true,
  };

  const action = {
    type: 'TestAction',
    payload: {
      name: 'alex',
    },
    error: false,
  };

  jest.useFakeTimers();
  const middleware = logMiddleware(option)(store as any)(store.dispatch);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    window.slv(LogLevel.INFO);
    window.gl('wrongPW');
  });

  test('logMiddleware should call next function properly', () => {
    middleware(action);
    expect(store.dispatch).toHaveBeenCalled();
  });
  test('logMiddleware should call setTimeout properly', () => {
    (window).gl(option.pw);
    expect(setTimeout).toHaveBeenCalledTimes(0);
    middleware(action);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
