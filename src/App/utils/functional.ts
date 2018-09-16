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

// Pipe mutators which curried with payloads.
export const pipeM = <S>(...fns: PipedMutator<S>[]) =>
  fns.reduce((first, next) => (state: S) => first(next(state)), identity);
