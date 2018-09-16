// Types
import {
  LogLevel,
  ILogLevel,
  Logger,
  EnableLogs,
  IsLogEnabled,
  InitLogLevel,
  IsAllowedLevel,
  ApplyLogLevelFilter,
} from '@/App/store/middleware/logger/types';

declare global {
  interface Window {
    gl?(n: string): void; // get logs (enable with correct pw / disable with incorrect pw)
    gle?(): boolean; // get log enabled?
    slv?(l: string): void; // set log level
    glv?(): string | void; // get log level
  }
}

const logLevel = new Map(Object.entries(LogLevel));

const notAllowed = {
  log: [LogLevel.WARN, LogLevel.ERROR],
  debug: [LogLevel.WARN, LogLevel.ERROR],
  info: [LogLevel.WARN, LogLevel.ERROR],
  warn: [LogLevel.ERROR],
  error: [] as LogLevel[],
};

const _logLevelFilter = (g: Window, nConsole: Logger) =>
  ((key: keyof ILogLevel, ...rest) =>
    !notAllowed[key].some(lv => lv === g.glv())
      && nConsole[key](...rest)) as ApplyLogLevelFilter;

export const _logger = (global: Window): Logger => {
  const nativeConsole = { ...global.console };
  const applyLogLevelFilter: ApplyLogLevelFilter = _logLevelFilter(global, nativeConsole);
  return ({
    log: (...arg) => applyLogLevelFilter('log', ...arg),
    debug: (...arg) => applyLogLevelFilter('debug', ...arg),
    info: (...arg) => applyLogLevelFilter('info', ...arg),
    warn: (...arg) => applyLogLevelFilter('warn', ...arg),
    error: (...arg) => nativeConsole.error(...arg),
    table: (...arg) => nativeConsole.table(...arg),
    trace: (...arg) => nativeConsole.trace(...arg),
    group: (...arg) => nativeConsole.group(...arg),
    groupEnd: () => nativeConsole.groupEnd(),
    groupCollapsed: (...arg) => nativeConsole.groupCollapsed(...arg),
    clear: () => nativeConsole.clear(),
  });
};
// init logger
const logger: Logger = _logger(window);

export const enableLogs: EnableLogs = (pw, logger) => {
  let _e = false;
  const _p = pw;
  return (() => {
    if (typeof window === 'object' && typeof window.gl !== 'function') {
      window.gl = (p) => {
        const m = window.btoa(p) === _p;
        m && logger.clear();
        logger.log(
          `%c   -----  Logger is ${m ? 'en' : 'dis'}abled!  -----   `,
          `color: ${m ? 'yellow' : 'white'}; background: black; font-weight: bold`,
        );
        _e = m;
        m && process.env.BUILD_DATE && logger.log('Builds: ', process.env.BUILD_DATE);
        return _e;
      };
      window.gle = () => _e;
    }
    return _e;
  }) as IsLogEnabled;
};

export const initLogLevel: InitLogLevel = (init = LogLevel.INFO, checker, logger) => {
  let _logLevel: string = init;
  if (typeof window === 'object' && typeof window.gl !== 'function') {
    window.slv = (l: string) => {
      if (checker() && logLevel.get(l.toUpperCase())) {
        _logLevel = logLevel.get(l.toUpperCase());
        logger.error(`%cLogLevel: ${_logLevel}`, 'font-weight: bold; color: black;');
      }
    };
    window.glv = () => checker() && _logLevel;
  }
  return (
    () => (_logLevel === LogLevel.INFO || _logLevel === LogLevel.DEBUG)
  ) as IsAllowedLevel;
};

export default logger;
