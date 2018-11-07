interface Mutator<P, S> {
  (p: P): (s: S) => S;
}
interface PipedMutator<S> {
  (s: S): S;
}

interface P {
  data: object;
}

type M = object;
