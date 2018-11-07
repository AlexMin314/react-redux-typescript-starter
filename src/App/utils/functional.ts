// use ramda if you can.
// https://ramdajs.com/

/**
 * Base Functions
 */
export const identity = <I>(arg: I): I => arg;

export const nothing = (): void => {};

/**
 * Custom Seqeunce Functions
 * - Immediately escape pipe/iteration when the condition matches.
 * - No mutation on the arguments passed in.
 */
export const andSeq = (...bools: boolean[]) => bools.every(bool => bool === true);

export const orSeq = (...bools: boolean[]) => bools.some(bool => bool === true);

export const predicateAndSeq = (...fns: Matcher<string>[]) =>
  (...args: string[]) => fns.every(fn => fn(...args));

export const predicateOrSeq = (...fns: Matcher<string>[]) =>
  (...args: string[]) => fns.some(fn => fn(...args));

export const combineSeqsAsAnd = (...predSeqs: Matcher<string>[]) =>
  (...args: string[]) => predSeqs.every(((seq, i) => seq(args[i])));

export const combineSeqsAsOr = (...predSeqs: Matcher<string>[]) =>
  (...args: string[]) => predSeqs.some(((seq, i) => seq(args[i])));

/**
 * Custom Composition/Pipe/Chain
 * - No escape during the pipe.
 * - mutated/identical arguments or nothing can be passed to the next function.
 */

// Pipe mutators
export const pipeM = <S>(...fns: PipedMutator<S>[]) =>
  fns.reduce((first, next) => (state: S) => next(first(state)), identity);

// Pipe async/await, promise
export const pipeA = (...fns: any[]) => (store: any) =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(store));

/**
 * Condistion handler
 */

// Maybe like for async/await, promise
export const ifThenA = (predicate: any, fn: any) =>
  (...args: any[]) => predicate(...args)
    .then((result: boolean) => result ? fn(...args) : nothing());

// Either like
export const ifElse = (predicate: any, left: any, right: any = identity) =>
  (...args: any[]) => predicate(...args) ? left(...args) : right(...args);

// Either like for async/await, promise
export const ifElseA = (predicate: any, left: any, right: any = identity) =>
  (...args: any[]) => predicate(...args)
    .then((result: boolean) => result ? left(...args) : right(...args));
