import { path } from 'ramda';

// ERRORS
export const throwError = (s: string) => (): never => {
  throw new Error(s);
};

// MATCHERS
export const isTruthyString: Matcher<string> = (ch) => (typeof ch === 'string' && !!ch);

export const isMemberOf = <T>(target: T) => (s: keyof T) => !!target[s];

export const isMatched: CurriedMatcher2<{}, string | string[], string> = (obj) =>
  (...keys) => (target) => path(keys, obj) === target;

// CHECKER
export const isPromise = (promise: any) => {
  if (!promise) return false;
  return promise.then && promise.catch;
};
