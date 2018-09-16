import { logFormattedError } from './formatter';

// Types
import { Logger } from './types';

export const registerOnError = (global: Window, logger: Logger) => {
  global.onerror = (message, source, lineno, colno, error) => {
    logFormattedError(message, error, logger);
    return true;
  };
};
