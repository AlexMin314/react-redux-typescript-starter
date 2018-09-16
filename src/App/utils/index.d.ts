interface Matcher<M> {
  (...m: M[]): boolean;
}
interface CurriedMatcher1<S, M> {
  (...s: S[]): Matcher<M>;
}
interface CurriedMatcher2<E, S, M> {
  (...e: E[]): CurriedMatcher1<S, M>;
}
