import { registerOnError } from '@/App/store/middleware/logger/errorHandlers';

import { mockedLogger as logger } from '@/App/store/middleware/logger/__test__/logger.test';

describe('Logger Middleware - errorHandler', () => {

  test('registerOnError should work as expected', () => {
    const mockError = {
      message: 'this is an error',
      name: 'this is an error',
      stack: 'this is a stack',
    };

    const someFunction = () => {
      throw mockError;
    };

    registerOnError(window, logger);
    try {
      someFunction();
    } catch (e) {
      window.onerror.call(window, e.message, '/test', 1, 1, e);
    }
    expect(logger.error).toHaveBeenCalled();
  });
});
