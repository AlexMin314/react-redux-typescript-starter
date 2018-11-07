import { logFormattedError } from '@/App/store/middleware/logger/formatter';

// Types
import { Logger } from '@/App/store/middleware/logger/types';

export const registerOnError = (global: Window, logger: Logger) => {
  global.onerror = (message, source, lineno, colno, error) => {
    logFormattedError(message, error!, logger);
    return true;
  };
};
