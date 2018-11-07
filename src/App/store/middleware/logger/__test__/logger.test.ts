import { enableLogs, initLogLevel, _logger } from '@/App/store/middleware/logger/logger';
import { Logger, LogLevel } from '@/App/store/middleware/logger/types';

export const mockedLogger = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  group: jest.fn(),
  groupCollapsed: jest.fn(),
  groupEnd: jest.fn(),
  trace: jest.fn(),
  clear: jest.fn(),
  table: jest.fn(),
};

describe('Logger Middleware - logger', () => {

  let Logger: Logger;
  const isLogEnabled = enableLogs(window.btoa('test'), mockedLogger);
  const isAllowedLevel = initLogLevel(LogLevel.INFO, isLogEnabled, mockedLogger);
  const nativeConsole = { ...window.console };
  (window as any).console = mockedLogger;

  beforeEach(() => {
    jest.resetAllMocks();
    Logger = _logger((window as any));
  });

  afterAll(() => {
    (window as any).slv(LogLevel.INFO);
    (window as any).gl('wrongPW');
    (window as any).console = nativeConsole;
  });

  test('enableLogs should return boolean', () => {
    expect(typeof isLogEnabled() === 'boolean').toBe(true);
  });

  test('gl(get log) should work properly with unmatched pw', () => {
    const result = (window as any).gl('alex');
    expect(mockedLogger.clear).not.toHaveBeenCalled();
    expect(mockedLogger.log).toHaveBeenCalled();
    expect(result).toBe(false);
  });
  test('gl(get log) should work properly with matched pw', () => {
    const result = (window as any).gl('test');
    expect(mockedLogger.clear).toHaveBeenCalled();
    expect(mockedLogger.log).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test('gle(get log enabled) should return true with matched pw', () => {
    expect((window as any).gle()).toBe(true);
  });

  test('isAllowedLevel by initLogLevel should return true if logLevel is "info"', () => {
    (window as any).slv('info');
    expect(isAllowedLevel()).toBe(true);
  });
  test('isAllowedLevel by initLogLevel should return false if logLevel is "warn"', () => {
    (window as any).slv('warn');
    expect(isAllowedLevel()).toBe(false);
  });
  test('isAllowedLevel by initLogLevel should return false if logLevel is "error"', () => {
    (window as any).slv('error');
    expect(isAllowedLevel()).toBe(false);
  });

  test('glv(get log level) should return properly when logLevel is "info" setted by slv(set log level)', () => {
    (window as any).slv('info');
    expect((window as any).glv() === LogLevel.INFO).toBe(true);
  });
  test('glv(get log level) should return properly when logLevel is "debug" setted by slv(set log level)', () => {
    (window as any).slv('debug');
    expect((window as any).glv() === LogLevel.DEBUG).toBe(true);
  });
  test('glv(get log level) should return properly when logLevel is "warn" setted by slv(set log level)', () => {
    (window as any).slv('warn');
    expect((window as any).glv() === LogLevel.WARN).toBe(true);
  });
  test('glv(get log level) should return properly when logLevel is "error" setted by slv(set log level)', () => {
    (window as any).slv('error');
    expect((window as any).glv() === LogLevel.ERROR).toBe(true);
  });
  test('glv(get log level) should return nothing when logLevel is not in the Enum', () => {
    (window as any).slv('alex');
    expect(mockedLogger.error).not.toHaveBeenCalled();
  });

  test('When the logLevel is info, some logging methods must be dispalyable ', () => {
    (window as any).slv('info');
    Logger.log();
    Logger.info();
    Logger.debug();
    expect(mockedLogger.log).toHaveBeenCalled();
    expect(mockedLogger.info).toHaveBeenCalled();
    expect(mockedLogger.debug).toHaveBeenCalled();
  });
  test('When the logLevel is warn, some logging methods should not be displayed ', () => {
    (window as any).slv('warn');
    Logger.log();
    Logger.info();
    Logger.debug();
    expect(mockedLogger.log).not.toHaveBeenCalled();
    expect(mockedLogger.info).not.toHaveBeenCalled();
    expect(mockedLogger.debug).not.toHaveBeenCalled();
  });
  test('When the logLevel is error, some logging methods should not be displayed ', () => {
    (window as any).slv('error');
    Logger.warn();
    expect(mockedLogger.warn).not.toHaveBeenCalled();
  });
  test('Some log method will be displayed even th logLevel is error', () => {
    (window as any).slv('error');
    Logger.error();
    Logger.table();
    Logger.trace();
    Logger.group();
    Logger.groupCollapsed();
    Logger.groupEnd();
    Logger.clear();
    expect(mockedLogger.error).toHaveBeenCalled();
    expect(mockedLogger.table).toHaveBeenCalled();
    expect(mockedLogger.trace).toHaveBeenCalled();
    expect(mockedLogger.group).toHaveBeenCalled();
    expect(mockedLogger.groupCollapsed).toHaveBeenCalled();
    expect(mockedLogger.groupEnd).toHaveBeenCalled();
    expect(mockedLogger.clear).toHaveBeenCalled();
  });
});