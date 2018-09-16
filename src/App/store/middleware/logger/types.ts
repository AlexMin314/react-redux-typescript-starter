import { Action } from 'redux-act';

export interface P {
  data: object;
}

export type M = object;

export interface Option<L> {
  pw: string;
  whiteListed?: string[];
  blackListed?: string[];
  logLevel?: L;
  logState?: boolean;
}

type log = (object | string | number | boolean)[];
type table = (object | string | number | boolean)[];
type label = string[];

export interface Logger {
  log(...args: log): void;
  info(...args: log): void;
  debug(...args: log): void;
  warn(...args: log): void;
  error(...args: log): void;
  clear(): void;
  group(...args: label): void;
  groupCollapsed(...args: label): void;
  groupEnd(): void;
  trace(...args: log): void;
  table(...args: table): void;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
export interface ILogLevel {
  debug: string;
  info: string;
  warn: string;
  error: string;
}

export interface IsLogEnabled {
  (): boolean;
}

export interface ApplyLogLevelFilter {
  (key: string, ...rest: log): boolean | void;
}

export interface EnableLogs {
  (pw: string, logger: Logger): IsLogEnabled;
}

export interface IsAllowedLevel {
  (): boolean;
}

export interface InitLogLevel {
  (init: LogLevel, checker: IsLogEnabled, logger: Logger): IsAllowedLevel;
}

export type FilterFn = {
  (type?: string): boolean,
};

export interface Mapper {
  (o: object, l: Logger, e?: boolean): void;
}

export interface LogFormattedState {
  (
    prevState: object,
    nextState: object,
    currentAction: Action<P, M>,
    sequence: number,
    url: string,
    logger: Logger,
  ): void;
}

type Error = {
  stack?: string;
  message?: string | Event;
  session?: string;
};

export interface LogFormattedError {
  (message: string | Event, error: Error, logger?: Logger): void;
}

type Request = {
  data?: object,
  url: string,
  method: string,
};

type Response = {
  config: {
    method: string,
    url: string,
  },
  data?: object,
  status: number,
  statusText?: string,
};

export interface LogOnRequest {
  (request: Request): void;
}

export interface LogResponses {
  (response: Response, logger: Logger, isError?: boolean): (void | boolean);
}

export interface LogOnResponse {
  (response: Response): (void | boolean);
}
